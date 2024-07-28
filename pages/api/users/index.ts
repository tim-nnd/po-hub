import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { getAuth } from "firebase-admin/auth";
import Cookies from 'cookies';
import { getFirebaseAdminApp } from "@/lib/getFirebaseAdminApp";
import UpdateUserRequest from "@/model/spec/UpdateUserRequest";

const postUser = async (userId: string, username: string, phone_number: string) => {
  await dbConnect();
  const user = await User.findOne({ _id: userId }).lean();
  if (!user) return;

  try {
    const newFields = {
      username: username,
      phone_number: phone_number
    };

    await User.updateOne({
      _id: userId,
    }, newFields);

    return {
      ...user,
      ...newFields
    }
  } catch (error) {
    console.error(error);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
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

      const spec = UpdateUserRequest.parse(req.body);

      const user = await postUser(idToken.uid, spec.username, spec.phone_number);
      res.status(200).json({ success: true, user: user });
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false })
    }
  } else {
    res.status(400).json({ success: false })
  }
}

export default handler;
