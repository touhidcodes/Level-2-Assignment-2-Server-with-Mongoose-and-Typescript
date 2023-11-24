import mongoose, { Schema } from "mongoose";
import { TAddress, TFullName, TUser, UserModel } from "./user.interface";
import { OrderSchema } from "../order/order.model";

const UserNameSchema = new Schema<TFullName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false }
);

const AddressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: UserNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: AddressSchema,
  orders: OrderSchema,
});

//  static method
userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// Define a pre-save hook to create 'orders' property if it doesn't exist
userSchema.pre<TUser>("save", function (next) {
  if (!this.orders) {
    this.orders = [];
  }
  console.log(this);
  next();
});

const User = mongoose.model<TUser, UserModel>("User", userSchema);

export default User;
