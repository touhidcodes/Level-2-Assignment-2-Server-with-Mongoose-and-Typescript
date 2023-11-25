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

export const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
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
