import mongoose, { Document, Query, Schema } from "mongoose";
import bcrypt from "bcrypt";

//  user schema
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from "./user.interface";
import config from "../../config";

const FullNameSchema = new Schema<TFullName>(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
  },
  { _id: false }
);

const AddressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: [true, "Street is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
  },
  { _id: false }
);

export const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<TUser & Document, UserModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  fullName: FullNameSchema,
  age: { type: Number, required: [true, "Age is required"] },
  email: { type: String, required: [true, "Email is required"] },
  isActive: { type: Boolean, required: [true, "isActive is required"] },
  hobbies: { type: [String], required: [true, "Hobbies are required"] },
  address: AddressSchema,
  orders: { type: [orderSchema], default: [] },
});

//  static method

userSchema.statics.isUserExists = async function (
  userId: number
): Promise<TUser | null> {
  return this.findOne({ userId }).exec();
};

// Define a static method to calculate total price for a user
userSchema.statics.calculateTotalPrice = async function (userId: string) {
  const user = await this.findOne({ userId });

  if (!user) {
    return null;
  }
  // Calculate total price of orders
  const result = await this.aggregate([
    { $match: { userId } },
    { $unwind: "$orders" },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    { $project: { totalPrice: 1, userId: 1, fullName: 1 } },
  ]);

  return result.length > 0 ? result[0].totalPrice : 0;
};

userSchema.pre(/^find/, function (this: Query<TUser, Document>, next) {
  this.find({ isActive: { $eq: true } });
  next();
});

userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isActive: { $ne: true } } });
  next();
});

//  hashing password
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

//  user schema model
const User = mongoose.model<TUser & Document, UserModel>("User", userSchema);

export default User;
