import dbConnect from '@/lib/dbConnect';
import { getFirebaseAdminApp } from '@/lib/getFirebaseAdminApp';
import { createProduct } from '@/lib/products';
import { IProduct, IProductVariation, Product } from '@/model/Product';
import CreateProductRequest from '@/model/spec/CreateProductRequest';
import Cookies from 'cookies';
import { getAuth } from 'firebase-admin/auth';
import { nanoid } from 'nanoid';

export default async function handler(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return postProduct(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}


const postProduct = async (req: any, res: any) => {
  await dbConnect();
  const validatedProduct = CreateProductRequest.parse(req.body);

  const product = {
    name: validatedProduct?.name,
    description: validatedProduct?.description,
    image_url: validatedProduct?.image_url,
    state: 'AVAILABLE',
    closed_at: validatedProduct?.closed_at.toISOString(),
    available_at: validatedProduct?.available_at.toISOString(),
    min_order: validatedProduct?.min_order,
    max_order: validatedProduct?.max_order,
    seller_id: '',
    variations: validatedProduct?.variations.map(variation => {
      return {
        id: nanoid(), // Provide based on your business logic
        name: variation?.name,
        price: variation?.price,
        image_url: variation?.image_url
      } as IProductVariation;
    }),
  } as IProduct;

  try {
    const auth = getAuth(getFirebaseAdminApp());
    const cookies = new Cookies(req, res);
    const token = cookies.get('token');

    if (!token) {
      throw new Error("No Token")
    }

    const idToken = await auth.verifyIdToken(token);

    if (!idToken) {
      throw new Error("Invalid Token")
    }

    product.seller_id = idToken.uid;
    createProduct(product)
    return res.status(200).json({ status: 'success', message: 'Product has been added' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal error' });
  }

}

