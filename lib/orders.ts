import { IOrder, Order } from "@/model/Order";
import dbConnect from "./dbConnect";

export const createOrder = async (order: IOrder) => {
  await dbConnect();
  return await Order.create(order);
}

export const cancelOrders = async (productId: string, newState: string) => {
  await dbConnect();
  return await Order.updateMany({
    'product_detail.product_id': productId
  }, {
    $set: {
      state: newState
    }
  })
}

export const getOrdersByProductId = async (productId: string) => {
  await dbConnect();
  return await Order.find({
    'product_detail.product_id': productId
  }).lean()
}