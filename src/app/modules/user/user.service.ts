import { TOrder, TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  // if (await User.isUserExists(user.userId)) {
  //   throw new Error("User Already Exists");
  // }
  const result = await User.create(user);
  return result;
};

const getUserFromDB = async (): Promise<TUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  // if (await User.isUserExists(id)) {
  //   throw new Error("User Already Exists");
  // }
  const result = await User.findOne({ userId: id });
  return result;
};

const updateUserIntoDB = async (userId: string, userData: TUser) => {
  const result = await User.updateOne({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};

const createOrderIntoDB = async (order: TOrder) => {
  const result = await User.create(order);
  return result;
};

const getOrderFromDB = async (id: string) => {
  const result = await User.findOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  createOrderIntoDB,
  getOrderFromDB,
};
