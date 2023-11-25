import { TOrder, TUser } from "./user.interface";
import User from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await User.find().select({
    userId: 0,
    password: 0,
    isActive: 0,
    hobbies: 0,
    orders: 0,
  });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ userId: id }).select({
    password: 0,
    // orders: 0,
  });
  return result;
};

const updateUserIntoDB = async (userId: string, userData: TUser) => {
  const result = await User.updateOne({ userId }, userData, {
    new: true,
  }).select({
    password: 0,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId });
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

const getTotalPriceFromDB = async (userId: string) => {
  const result = await User.aggregate([
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
    { $project: { totalPrice: 1 } },
  ]);

  return result;
};

export const isUserExist = async (userId: number) => {
  return User.isUserExists(userId);
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  createOrderIntoDB,
  getOrderFromDB,
  getTotalPriceFromDB,
};
