// pages/api/users/me.js
// import { getUserById } from '@lib/db'; // Import your database function

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    const { pagination } = req.pagination;
       
    // for now let's not use JWT so people can see
    
    try {
  
      // const products = await getProducts(pagination);
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
        },
        {
            "id": "2",
            "name": "Product 2",
            "description": "Description of Product 2",
            "image_url": "http://example.com/image2.jpg",
            "state": "SOLD_OUT",
            "close_order_date": new Date("2023-11-30T23:59:59Z"),
            "available_order_date": new Date("2023-11-30T23:59:59Z"),
            "min_order": 1,
            "max_order": 50,
            "seller_id": "456",
            "product_order_count": 50
        },
        {
            "id": "3",
            "name": "Product 3",
            "description": "Description of Product 3",
            "image_url": "http://example.com/image3.jpg",
            "state": "AVAILABLE",
            "close_order_date": new Date("2023-10-31T23:59:59Z"),
            "available_order_date": new Date("2023-10-31T23:59:59Z"),
            "min_order": 1,
            "max_order": 200,
            "seller_id": "789",
            "product_order_count": 100
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
  