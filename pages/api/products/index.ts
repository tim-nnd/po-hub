// pages/api/users/me.js
// import { getUserById } from '@lib/db'; // Import your database function

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
    const body = req.body;
    
    try {
        // save to DB
        res.status(200).json({ status: 'success', message: 'Product has been added' /*, data: ... */});
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' });
    }
    
} 

