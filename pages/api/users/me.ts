// pages/api/users/me.js
import dbConnect from '@/lib/dbConnect';
import GetUserResponse from '@/model/spec/GetUserResponse';
import { IUser, User } from '@/model/User';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
// import { getUserById } from '@lib/db'; // Import your database function

const JWT_SECRET = process.env.JWT_SECRET as Secret; // Make sure to set this in your environment variables

const getUserById = async (userId: string) => {
  await dbConnect();
  return await User.findOne({_id: userId}).lean();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ message: 'No token provided' });
  // }

  // const token = authHeader.split(' ')[1];

  try {
    // const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userId = "test";

    const user: IUser | null = await getUserById(userId); // Fetch user data from your database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      phone_number: user.phone_number,
    } as GetUserResponse);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
