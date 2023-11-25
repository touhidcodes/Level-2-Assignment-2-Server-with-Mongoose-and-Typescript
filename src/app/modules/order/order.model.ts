import mongoose, { Schema } from "mongoose";
import { TOrder } from "../user/user.interface";

export const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderModel = mongoose.model<TOrder>("Order", orderSchema);

export default OrderModel;
