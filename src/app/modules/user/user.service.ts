import { User } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (user: User): Promise<User> => {
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async (): Promise<User[]> => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserIntoDB = async (
  id: string,
  userData: User
): Promise<User | null> => {
  const result = await UserModel.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
