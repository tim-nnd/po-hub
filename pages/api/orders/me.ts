import dbConnect from "@/lib/dbConnect";
import { getOrderCountByProductId, getOrdersByUserId } from "@/lib/orders";
import { getUserUidFromCookies } from "@/lib/users";
import { IOrder, Order } from "@/model/Order";
import GetOrderMeResponse, { OrderProductDetail, OrderProductDetailVariation } from "@/model/spec/GetOrderMeResponse";

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
  try {

    const orders: IOrder[] | null = await getOrdersByUserId(userId);
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    
    const resp = orders.map(async order => {

      const [orderCount] = await Promise.all([
        getOrderCountByProductId(order.product_detail.product_id)
      ]);

        return {
          id: order._id,
          buyer_id: order.buyer_id,
          state: order.state,
          created_at: order.created_at,
          product_detail: {
            product_id: order.product_detail.product_id,
            name: order.product_detail.name,
            description: order.product_detail.description,
            image_url: order.product_detail.image_url,
            state: order.product_detail.state,
            closed_at: order.product_detail.closed_at,
            available_at: order.product_detail.available_at,
            min_order: order.product_detail.min_order,
            max_order: order.product_detail.max_order,
            order_count: orderCount,
            seller_id: order.product_detail.seller_id,
            variations: order.product_detail.variations.map(variation => {
              return {
                variation_id: variation.variation_id,
                name: variation.name,
                image_url: variation.image_url,
                amount: variation.amount,
                price: variation.price,
                total_price: variation.total_price,
              } as OrderProductDetailVariation
            }),
            deleted_at: order.product_detail.deleted_at,
            created_at: order.product_detail.created_at,
            updated_at: order.product_detail.updated_at,
          } as OrderProductDetail,
        } as GetOrderMeResponse;
      });

    // const resp = await Promise.all(productsResponse);
    return res.status(200).json(resp);

  } catch (error) {

    return res.status(500).json({ message: 'Internal error' });

  }
}
