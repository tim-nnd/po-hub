// pages/api/users/me.js
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
// import { getUserById } from '@lib/db'; // Import your database function

const JWT_SECRET = process.env.JWT_SECRET as Secret; // Make sure to set this in your environment variables

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userId = decoded.id;

    // const user = await getUserById(userId); // Fetch user data from your database
    // MOCK
    const user = {"id": "123", "username": "user name", "phone_number": "0823876431325"}
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
