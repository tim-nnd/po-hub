import { model, Model, models, Types } from "mongoose";
import ProductSchema from "./schema/ProductSchema";

export interface IProductVariation {
  id: string,
  name: string,
  price: number,
  image_url: string,
}

export interface IProduct {
  _id: string,
  name: string,
  description: string,
  image_url: string,
  state: string,
  closed_at: string,
  available_at: string,
  min_order: number,
  max_order: number,
  seller_id: string,
  variations: IProductVariation[],
  deleted_at: string,
  created_at: string,
  updated_at: string
}

export const Product: Model<IProduct> = models.Product|| model('Product', ProductSchema);