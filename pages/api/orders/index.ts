import { createOrder } from '@/lib/orders';
import { getProductById } from '@/lib/products';
import { getUserUidFromCookies } from '@/lib/users';
import { IOrder, IProductDetail, IProductDetailVariation } from '@/model/Order';
import { IProduct } from '@/model/Product';
import CreateOrderRequest from '@/model/spec/CreateOrderRequest';

export default async function handler(req: any, res: any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            return await postOrder(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  

const postOrder = async (req: any, res: any) => {

  let user_id
  try {
    user_id = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const validatedOrder = CreateOrderRequest.parse(req.body);
  const product: IProduct | null = await getProductById(validatedOrder.product_id);
  

  if (!product) {
    return res.status(404).json({ message: 'Product not found!'})
  }

  const selectedVariations = validatedOrder.variations.map(selectedVariation => {
    const variation = product.variations.find(variation => variation.id === selectedVariation.variation_id);
    
    return {
      id: selectedVariation.variation_id,
      name: variation ? variation.name : '',
      image_url: variation ? variation.image_url : '',
      amount: selectedVariation.amount,
      price: variation ? variation.price : 0,
      totalPrice: (variation ? variation.price : 0) * selectedVariation.amount,
    };
  })

  const totalAmount = selectedVariations.reduce((total, variation) => total + variation.totalPrice, 0);

  const order = {
    _id: '',
    buyer_id: user_id,
    state: "BOOKED",
    total_price: totalAmount,
    product_detail: {
      product_id: validatedOrder.product_id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      state: product.state,
      closed_at: product.closed_at,
      available_at: product.available_at,
      min_order: product.min_order,
      max_order: product.max_order,
      seller_id: product.seller_id,
      variations: selectedVariations.map(selectedVariation => {
        return {
          variation_id: selectedVariation.id,
          name: selectedVariation.name,
          image_url: selectedVariation.image_url,
          amount: selectedVariation.amount,
          price: selectedVariation.price,
          total_price: selectedVariation.totalPrice,
        } as IProductDetailVariation
      }),
    } as IProductDetail,
  } as IOrder

  try {
      createOrder(order)
      return res.status(200).json({ status: 'success', message: 'Order has been created' /*, data: ... */});
  } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal error' });
  }
    
} 

