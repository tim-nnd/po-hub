import { getNotificationByUserId } from "@/lib/notifications";
import { getUserUidFromCookies } from "@/lib/users";
import { INotification } from "@/model/Notification";
import { GetNotificationMeResponse } from "@/model/spec/GetNotificationMeResponse";

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const notifications: INotification[] | null = await getNotificationByUserId(userId);

  const resp = notifications.map(notification => {
    return {
      id: notification._id,
      recipient_id: notification.recipient_id,
      title: notification.title,
      body: notification.body,
      is_read: notification.is_read,
      image_url: notification.image_url,
      created_at: notification.created_at,
    } as GetNotificationMeResponse;
  })
  
  
  return res.status(200).json(resp);
}