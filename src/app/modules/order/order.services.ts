import { Order } from "./order.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = async (order: Order): Promise<Order> => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
