import { getOrderCountByProductId } from '@/lib/orders';
import { createProduct, getProductById } from '@/lib/products';
import { getUserById, getUserUidFromCookies } from '@/lib/users';
import { IProduct, IProductVariation, Product } from '@/model/Product';
import CreateProductRequest from '@/model/spec/CreateProductRequest';
import { GetProductResponse, ProductVariation } from '@/model/spec/GetProductDetailResponse';
import { nanoid } from 'nanoid';

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '5mb'
      }
  }
}

export default async function handler(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return postProduct(req, res);
    case 'GET':
      return getProduct(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const getProduct = async (req: any, res: any) => {
  const { product_id } = req.query;
  if (product_id == "") {
    return res.status(400).json({ message: 'Invalid product_id' })
  }

  try {
    const product: IProduct | null = await getProductById(product_id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found!' })
    }
    
    const [seller, orderCount] = await Promise.all([
      getUserById(product.seller_id),
      getOrderCountByProductId(product._id.toString())
    ]);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found!' })
    }

    const resp = {
      id: product?._id.toString(),
      name: product?.name,
      description: product?.description,
      image_url: product?.image_url,
      state: product?.state,
      closed_at: product?.closed_at,
      available_at: product?.available_at,
      min_order: product?.min_order,
      max_order: product?.max_order,
      seller: {
        id: product?.seller_id,
        name: seller.username,
      },
      variations: product.variations.map(variation => {
        return {
          variation_id: variation.id,
          name: variation.name,
          image_url: variation.image_url,
          price: variation.price,
        } as ProductVariation
      }),
      order_count: orderCount,
    } as GetProductResponse;

    return res.status(200).json(resp)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal error' });
  }
}

const postProduct = async (req: any, res: any) => {
  const validatedProduct = CreateProductRequest.parse(req.body);

  let userId
  try {
    userId = await getUserUidFromCookies(req, res);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

  const product = {
    name: validatedProduct?.name,
    description: validatedProduct?.description,
    image_url: validatedProduct?.image_url,
    state: 'AVAILABLE',
    closed_at: validatedProduct?.closed_at.toISOString(),
    available_at: validatedProduct?.available_at.toISOString(),
    min_order: validatedProduct?.min_order,
    max_order: validatedProduct?.max_order,
    seller_id: userId,
    variations: validatedProduct?.variations.map(variation => {
      return {
        id: nanoid(),
        name: variation?.name,
        price: variation?.price,
        image_url: variation?.image_url
      } as IProductVariation;
    }),
  } as IProduct;

  try {
    await createProduct(product);
    return res.status(200).json({ status: 'success', message: 'Product has been added' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

}

