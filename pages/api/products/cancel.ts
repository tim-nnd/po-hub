import { createNotification } from "@/lib/notifications";
import { cancelOrders, getOrdersByProductId } from "@/lib/orders";
import { cancelProduct } from "@/lib/products";
import { getUserUidFromCookies } from "@/lib/users";
import { INotification } from "@/model/Notification";
import { IOrder } from "@/model/Order";



export default async function handler(req: any, res: any) {
  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const { productId } = req.query; 

  cancelProduct(productId, userId)
  .then(cancelledProduct => {
    if (!cancelledProduct) {
      return res.status(404).json({ message: 'Product not found!' })
    }

    // CANCEL ALL ORDERS
    cancelOrders(productId, "CANCELLED_BY_SELLER")
    .then(async (result) => {
      if (result.modifiedCount > 0 ) {
        const cancelledOrders: IOrder[] | null = await getOrdersByProductId(productId)
        if (cancelledOrders && cancelledOrders.length > 0) {
          cancelledOrders.map(cancelledOrder => {
            const notif = {
              _id: '',
              recipient_id: cancelledOrder.buyer_id,
              title: `Your order was cancelled :(`,
              body: `Your order for ${cancelledOrder.product_detail.name} was cancelled by seller.<br>Don't worry, your money will be 100% refunded.`,
              is_read: false,
              image_url: cancelledOrder.product_detail.image_url,
            } as INotification

            createNotification(notif)
          })
        }
      }

      return res.status(201).json({ message: 'success cancelling order' })
    })
    .catch(error => {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    })
  })
  .catch(error => {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  })

  return res.status(501).json({ message: 'Not implemented' })
}