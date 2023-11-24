import { Model } from "mongoose";
import { Order } from "../order/order.interface";

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
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
  orders: Order[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser | null>;
}
