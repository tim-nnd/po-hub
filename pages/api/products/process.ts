import { getOrderCountByProductId } from "@/lib/orders";
import { getProductsAfterCloseTime, setProductToClosedState } from "@/lib/products";
import { IProduct } from "@/model/Product";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const products: IProduct[] | null = await getProductsAfterCloseTime(new Date());

    const updates = products.map(async product => {
      const orderCount = await getOrderCountByProductId(product._id);
      
      if (orderCount > product.min_order) {
        return setProductToClosedState(product._id);
      }
    })
    
    await Promise.all(updates);

    return res.status(201).json({ message: "Success process products" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal error" });
  }
}