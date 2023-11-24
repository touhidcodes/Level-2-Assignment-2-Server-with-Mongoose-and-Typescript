import { User } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
};
