import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

export const OrderSchema = new Schema<Order>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderModel = mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
