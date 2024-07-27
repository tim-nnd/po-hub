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

export const getOrderCountByProductId = async (productId: string) => {
  await dbConnect();
  const result = await Order.aggregate([
    {
      $match: {
        'product_detail.product_id': productId
      }
    },
    {
      $unwind: '$product_detail.variations'
    },
    {
      $group: {
        _id: null,
        orderCount: { $sum: '$product_detail.variations.amount' }
      }
    }
  ]);

  return result[0]?.orderCount || 0;
}

// TODO: use pagination
export const getOrdersByUserId = async (userId: string) => {
  await dbConnect();
  return await Order.find({
      buyer_id: userId,
  }).lean();
}