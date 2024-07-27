import { User } from "@/model/User";
import dbConnect from "./dbConnect";

const getUserById = async (userId: string) => {
    await dbConnect();
    return await User.findOne({
        _id: userId
    }).lean();
  }

  export default getUserById;