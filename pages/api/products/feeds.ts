import dbConnect from "@/lib/dbConnect";
import { getOrderCountByProductId } from "@/lib/orders";
import { getUserById } from "@/lib/users";
import { IProduct, Product } from "@/model/Product";
import { GetProductFeedItem } from "@/model/spec/GetProductFeedItem";

const getProducts = async () => {
  await dbConnect();
  return await Product.find({
    deleted_at: null
  }).sort({ created_at: -1 }).lean()
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') { 
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 20;

  try {
    const products: IProduct[] | null = await getProducts();
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    const productsResponse = products.map(async product => {

      const [orderCount] = await Promise.all([
        // getUserById(product.seller_id),
        getOrderCountByProductId(product._id.toString())
      ]);

      return {
        id: product._id,
        name: product.name,
        description: product.description,
        image_url: product.image_url,
        state: product.state,
        closed_at: product.closed_at,
        available_at: product.available_at,
        min_order: product.min_order,
        max_order: product.max_order,
        seller: {
          id: product.seller_id,
        },
        order_count: orderCount,
      } as GetProductFeedItem;
    });

    const resp = await Promise.all(productsResponse);
    return res.status(200).json(resp);

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
