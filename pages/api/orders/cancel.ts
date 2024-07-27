import { cancelOrder } from "@/lib/orders";
import { getUserUidFromCookies } from "@/lib/users";

export default async function handler(req: any, res: any) {
  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const { order_id } = req.query; 

  cancelOrder(order_id, userId)
  .then(cancelledorder => {
    if (!cancelledorder) {
      return res.status(404).json({ message: 'Order not found!' })
    }
      return res.status(201).json({ message: 'success cancelling order' })
    })
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    })

  return res.status(501).json({ message: 'Not implemented' })
}