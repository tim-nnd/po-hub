import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getAuth } from "firebase-admin/auth";
import Cookies from 'cookies';
import { getFirebaseAdminApp } from "@/lib/getFirebaseAdminApp";

const postSyncUser = async (userId: string, email: string | undefined) => {
  await dbConnect();
  const user = await User.findOne({ _id: userId }).lean();
  if (user) return;

  try {
    await User.create({
      _id: userId,
      email: email,
    });
  } catch (error) {
    console.error(error);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
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

      await postSyncUser(idToken.uid, idToken.email);
      res.status(200).json({ success: true, user: idToken })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false })
    }
  } else {
    res.status(400).json({ success: false })
  }
}

export default handler;
