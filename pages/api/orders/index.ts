import { createOrder, getOrderById, getOrderCountByProductId, getOrdersByProductId } from '@/lib/orders';
import { getProductById } from '@/lib/products';
import { getUserUidFromCookies } from '@/lib/users';
import { IOrder, IProductDetail, IProductDetailVariation } from '@/model/Order';
import { IProduct } from '@/model/Product';
import CreateOrderRequest from '@/model/spec/CreateOrderRequest';
import { GetOrderDetailProductDetail, GetOrderDetailProductDetailVariation, GetOrderDetailResponse } from '@/model/spec/GetOrderDetailResponse';

export default async function handler(req: any, res: any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            return await postOrder(req, res);
        case 'GET':
            return await getOrder(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  

const getOrder = async (req: any, res: any) => {
  const { order_id } = req.query;
  if (order_id == "") {
    return res.status(400).json({ message: 'Invalid order_id' })
  }

  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const order: IOrder | null = await getOrderById(order_id, userId);
  if (!order) {
    return res.status(404).json({ message: "Order not found!" })
  }

  const [product, orderCount] = await Promise.all([
    getProductById(order.product_detail.product_id),
    getOrderCountByProductId(order.product_detail.product_id)
  ]);
  if (!product) {
    return res.status(404).json({ message: "Product not found!" })
  }

  let orderState = "Ordered";
  switch (order.state) {
    case "BOOKED":
      orderState = "Ordered"
      break;
    case "CANCELLED_BY_SELLER":
      orderState = "Cancelled by seller"
      break;
    case "COMPLETED":
      orderState = "Completed"
  
    default:
      break;
  }

  const resp = {
    id: order._id,
    buyer_id: order.buyer_id,
    state: orderState,
    total_price: order.total_price,
    product_detail: {
      product_id: product._id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      state: product.state,
      closed_at: product.closed_at,
      available_at: product.available_at,
      min_order: product.min_order,
      max_order: product.max_order,
      order_count: orderCount,
      seller_id: product.seller_id,
      variations: order.product_detail.variations.map(variation => {
        return {
          variation_id: variation.variation_id,
          name: variation.name,
          image_url: variation.image_url,
          amount: variation.amount,
          price: variation.price,
          total_price: variation.total_price,
        } as GetOrderDetailProductDetailVariation
      }),
      deleted_at: product.deleted_at,
      created_at: product.created_at,
    } as GetOrderDetailProductDetail,
    created_at: order.created_at,
  } as GetOrderDetailResponse

  return res.status(200).json(resp);

}

const postOrder = async (req: any, res: any) => {

  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
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
    buyer_id: userId,
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

