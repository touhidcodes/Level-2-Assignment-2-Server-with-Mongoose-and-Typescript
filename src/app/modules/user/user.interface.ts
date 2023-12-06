/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";

//  user type
export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[] | undefined;
};

//  user model interface
export interface UserModel extends Model<TUser & Document> {
  isUserExists(userId: number): Promise<TUser | null>;
}
