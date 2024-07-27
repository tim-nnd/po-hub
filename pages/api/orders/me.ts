import dbConnect from "@/lib/dbConnect";
import getUserById from "@/lib/user";
import { IOrder, Order } from "@/model/Order";
import GetOrderMeResponse from "@/model/spec/GetOrderMeResponse";


const getOrdersByUserId = async (userId: string, page: number, limit: number) => {
    await dbConnect();
    return await Order.find({
        buyer_id: userId,
    }).skip((page - 1) * limit).limit(limit).lean();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // TODO: get user_id from cookies
  const user_id = "test";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  try {

    const orders: IOrder[] | null = await getOrdersByUserId(user_id, page, limit);
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    
    const resp = orders.map(order => {
        return {
          id: order._id,
          buyer_id: order.buyer_id,
          state: order.state,
          created_at: order.created_at,
          product_detail: order.product_detail,
        } as GetOrderMeResponse;
      });

    // const resp = await Promise.all(productsResponse);
    return res.status(200).json(resp);

  } catch (error) {

    return res.status(500).json({ message: 'Internal error' });

  }
}
