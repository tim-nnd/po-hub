import { INotification, Notification } from "@/model/Notification";
import dbConnect from "./dbConnect";

export const createNotification = async (notification: INotification) => {
  await dbConnect();
  return await Notification.create(notification)
}