import { TOrder } from "../user/user.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = async (order: TOrder): Promise<TOrder> => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
