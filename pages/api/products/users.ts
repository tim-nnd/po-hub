// pages/api/users/me.js
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
// import { getUserById } from '@lib/db'; // Import your database function

const JWT_SECRET = process.env.JWT_SECRET as Secret; // Make sure to set this in your environment variables

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const reqUserId = req.user_id;

  try {

    // const products = await getProductsByUserId(reqUserId);
    // MOCK
    const products = [
        {
            "id": "1",
            "name": "Product 1",
            "description": "Description of Product 1",
            "image_url": "http://example.com/image1.jpg",
            "state": "AVAILABLE",
            "close_order_date": new Date("2023-12-31T23:59:59Z"),
            "available_order_date": new Date("2023-12-31T23:59:59Z"),
            "min_order": 1,
            "max_order": 100,
            "seller_id": "123",
            "product_order_count": 15
        }
    ]
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
