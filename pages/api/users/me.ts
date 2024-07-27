import dbConnect from '@/lib/dbConnect';
import { getFirebaseAdminApp } from '@/lib/getFirebaseAdminApp';
import GetUserResponse from '@/model/spec/GetUserResponse';
import { IUser, User } from '@/model/User';
import Cookies from 'cookies';
import { getAuth } from 'firebase-admin/auth';

const getUserById = async (userId: string) => {
  await dbConnect();
  return await User.findOne({ _id: userId }).lean();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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

    const user: IUser | null = await getUserById(idToken.uid); // Fetch user data from your database
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
