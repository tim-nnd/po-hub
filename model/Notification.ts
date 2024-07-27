import { model, Model, models } from "mongoose";
import NotificationSchema from "./schema/NotificationSchema";

export interface INotification {
  _id: string,
  recipient_id: string,
  title: string,
  body: string,
  is_read: boolean,
  image_url: string,
  created_at: string,
  updated_at: string
}

export const Notification: Model<INotification> = models.Notification || model('Notification', NotificationSchema);