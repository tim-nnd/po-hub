import { model, Model, models } from "mongoose";
import OrderSchema from "./schema/OrderSchema";

export interface IProductDetailVariation {
  variation_id: string,
  name: string,
  image_url: string,
  amount: number,
  price: number,
  total_price: number,
}

export interface IProductDetail {
  product_id: string,
  name: string,
  description: string,
  image_url: string,
  total_price: number,
  state: string,
  closed_at: string,
  available_at: string,
  min_order: number,
  max_order: number,
  seller_id: string,
  variations: IProductDetailVariation[],
  deleted_at: string,
  created_at: string,
  updated_at: string
}

export interface IOrder {
  _id: string,
  buyer_id: string,
  state: string,
  total_price: number,
  product_detail: IProductDetail,
  deleted_at: string,
  created_at: string,
  updated_at: string
}

export const Order: Model<IOrder> = models.Order|| model('Order', OrderSchema);