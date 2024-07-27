import { IOrder } from "@/model/Order";
import { Product } from "@/model/Product";
import dbConnect from "./dbConnect";

export const createOrder = async (order: IOrder) {
  await dbConnect();
  return await Product.create(order);
}