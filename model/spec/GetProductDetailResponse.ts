export interface ProductVariation {
  variation_id: string,
  name: string,
  image_url: string,
  price: number,
}

export interface GetProductResponse {
  id: string,
  name: string,
  description: string,
  image_url: string,
  state: string,
  closed_at: string,
  available_at: string,
  min_order: number,
  max_order: number,
  seller: {
    id: string,
    name: string
  },
  variations: ProductVariation[],
  order_count: number,
}