import dbConnect from "@/lib/dbConnect";
import getUserById from "@/lib/users";
import { IProduct, Product } from "@/model/Product";
import { IUser, User } from "@/model/User";

const getProducts = async (page: number, limit: number) => {
  await dbConnect();
  return await Product.find({
    deleted_at: null
  }).skip((page - 1) * limit).limit(limit).lean()
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
       
    // for now let's not use JWT so people can see
    
    try {
  
      // products.concat([
      //   {
      //       "id": "1",
      //       "name": "Product 1",
      //       "description": "Description of Product 1",
      //       "image_url": "http://example.com/image1.jpg",
      //       "state": "AVAILABLE",
      //       "close_order_date": new Date("2023-12-31T23:59:59Z"),
      //       "available_order_date": new Date("2023-12-31T23:59:59Z"),
      //       "min_order": 1,
      //       "max_order": 100,
      //       "seller_id": "123",
      //       "product_order_count": 15
      //   },
      //   {
      //       "id": "2",
      //       "name": "Product 2",
      //       "description": "Description of Product 2",
      //       "image_url": "http://example.com/image2.jpg",
      //       "state": "SOLD_OUT",
      //       "close_order_date": new Date("2023-11-30T23:59:59Z"),
      //       "available_order_date": new Date("2023-11-30T23:59:59Z"),
      //       "min_order": 1,
      //       "max_order": 50,
      //       "seller_id": "456",
      //       "product_order_count": 50
      //   },
      //   {
      //       "id": "3",
      //       "name": "Product 3",
      //       "description": "Description of Product 3",
      //       "image_url": "http://example.com/image3.jpg",
      //       "state": "AVAILABLE",
      //       "close_order_date": new Date("2023-10-31T23:59:59Z"),
      //       "available_order_date": new Date("2023-10-31T23:59:59Z"),
      //       "min_order": 1,
      //       "max_order": 200,
      //       "seller_id": "789",
      //       "product_order_count": 100
      //   }
      // ])

      const products: IProduct[] | null = await getProducts(page, limit);
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

    const resp = await Promise.all(productsResponse);
    return res.status(200).json(resp);

    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
  