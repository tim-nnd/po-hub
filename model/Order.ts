import { model, Model, models } from "mongoose";
import OrderSchema from "./schema/OrderSchema";

export interface IOrderDetail {
  id: string,
  variation_id: string,
  amount: number,
}

export interface IOrder {
  _id: string,
  buyer_id: string,
  product_id: string,
  state: string,
  min_order: number,
  max_order: number,
  details: IOrderDetail[],
  deleted_at: string,
  created_at: string,
  updated_at: string
}

export const Order: Model<IOrder> = models.Order|| model('Order', OrderSchema);