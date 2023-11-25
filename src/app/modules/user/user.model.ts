import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

const userSchema = new Schema<TUser, UserModel>({
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
userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// Define a pre-save hook to create 'orders' property if it doesn't exist
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

const User = mongoose.model<TUser, UserModel>("User", userSchema);

export default User;
