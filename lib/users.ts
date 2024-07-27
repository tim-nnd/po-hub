import { User } from "@/model/User";
import dbConnect from "./dbConnect";
import { getAuth } from "firebase-admin/auth";
import Cookies from 'cookies';
import { getFirebaseAdminApp } from "./getFirebaseAdminApp";

export const getUserById = async (userId: string) => {
    await dbConnect();
    return await User.findOne({
        _id: userId
    }).lean();
  }


export const getUserUidFromCookies = async (req: any, res: any) => {
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

    return idToken.uid

}