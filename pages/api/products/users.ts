// pages/api/users/me.js
import dbConnect from "@/lib/dbConnect";
import { IProduct, Product } from "@/model/Product";
import { IUser, User } from "@/model/User";


const getProductsByUserId = async (userId: string) => {
    await dbConnect();
    return await Product.find({
        seller_id: userId,
    }).lean();
}

const getUserById = async (userId: string) => {
    await dbConnect();
    return await User.findOne({
        _id: userId
    }).lean();
}


export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user_id } = req.query;
  
  try {

    const products: IProduct[] | null = await getProductsByUserId(user_id);
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    const productsResponse = products.map(async product => {

        const seller: IUser | null = await getUserById(product.seller_id)

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
            id: seller?._id,
            name: seller?.username,
          },
          order_count: -1 // TODO: add order count
        }
      });

    return res.status(200).json(productsResponse);

  } catch (error) {

    return res.status(500).json({ message: 'Internal error' });

  }
}
