export interface GetOrderDetailProductDetailVariation {
  variation_id: string,
  name: string,
  image_url: string,
  amount: number,
  price: number,
  total_price: number,
}

export interface GetOrderDetailProductDetail {
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
  order_count: number,
  seller_id: string,
  variations: GetOrderDetailProductDetailVariation[],
  deleted_at: string,
  created_at: string,
  updated_at: string
}

export interface GetOrderDetailResponse {
  id: string,
  buyer_id: string,
  state: string,
  total_price: number,
  product_detail: GetOrderDetailProductDetail,
  deleted_at: string,
  created_at: string,
  updated_at: string
}