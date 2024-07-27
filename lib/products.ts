import { IProduct, Product } from "@/model/Product";
import dbConnect from "./dbConnect"

export const getProductById = async (productId: string) => {
    await dbConnect();
    return await Product.findOne({
        _id: productId
    }).lean();
}

export const createProduct = async (product: IProduct) => {
    await dbConnect();
    return await Product.create(product)
}

export const cancelProduct = async (productId: string, sellerId: string) => {
    await dbConnect();
    return await Product.updateOne({
        _id: productId,
        seller_id: sellerId,
    }, {
        $set: {
            state: 'CANCELLED_BY_SELLER'
        }
    })
}