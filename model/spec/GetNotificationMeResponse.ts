export interface GetNotificationMeResponse {
  id: string,
  recipient_id: string,
  title: string,
  body: string,
  is_read: boolean,
  image_url: string,
  created_at: string,
  updated_at: string
}