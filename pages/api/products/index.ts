import { createProduct } from '@/lib/products';
import { IProduct, IProductVariation, Product } from '@/model/Product';
import CreateProductRequest from '@/model/spec/CreateProductRequest';

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
  

const postProduct = (req: any, res: any) => {
    const validatedProduct = CreateProductRequest.parse(req.body);
    
    const product = {
        _id: '',
        name: validatedProduct?.name,
        description: validatedProduct?.description,
        image_url: validatedProduct?.image_url,
        state: 'State Here', // Provide based on your business logic
        closed_at: validatedProduct?.closed_at.toISOString(),
        available_at: validatedProduct?.available_at.toISOString(),
        min_order: validatedProduct?.min_order,
        max_order: validatedProduct?.max_order,
        seller_id: 'Seller ID Here', // Provide based on your business logic
        variations: validatedProduct?.variations.map(variation => {
        return {
            id: '', // Provide based on your business logic
            name: variation?.name,
            price: variation?.price,
            image_url: variation?.image_url
        } as IProductVariation;
        }),
    } as IProduct;

    try {
        createProduct(product)
        return res.status(200).json({ status: 'success', message: 'Product has been added' /*, data: ... */});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal error' });
    }
    
} 

