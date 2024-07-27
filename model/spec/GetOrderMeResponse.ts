export interface OrderProductDetailVariation {
    variation_id: string,
    name: string,
    image_url: string,
    amount: number,
    price: number,
    total_price: number,
  }
  
  export interface OrderProductDetail {
    product_id: string,
    name: string,
    description: string,
    image_url: string,
    state: string,
    closed_at: string,
    available_at: string,
    min_order: number,
    max_order: number,
    order_count: number,
    seller_id: string,
    variations: OrderProductDetailVariation[],
    deleted_at: string,
    created_at: string,
    updated_at: string
  }

interface GetOrderMeResponse {
    id: string,
    buyer_id: string,
    state: string,
    product_detail: OrderProductDetail,
    deleted_at: string,
    created_at: string,
    updated_at: string
  }
  
  export default GetOrderMeResponse;