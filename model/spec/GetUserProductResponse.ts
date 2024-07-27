interface GetUserProductRequest {
  id: string,
  name: string,
  description: string,
  image_url: string,
  state: string,
  closed_at: string,
  available_at: string,
  min_order: string,
  max_order: string,
  seller: {
    id: string,
    name: string
  }
  order_count: number
}

export default GetUserProductRequest;