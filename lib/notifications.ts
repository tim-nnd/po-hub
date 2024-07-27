import { INotification, Notification } from "@/model/Notification";
import dbConnect from "./dbConnect";

export const createNotification = async (notification: INotification) => {
  await dbConnect();
  return await Notification.create(notification)
}

// TODO: add pagination
export const getNotificationByUserId = async (userId: string) => {
  await dbConnect();
  return await Notification.find({
    recipient_id: userId
  }).lean();
}
