export interface GetProductFeedItem {
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
    name: string,
  },
  order_count: number,
}