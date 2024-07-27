import { model, Model, models } from "mongoose";
import UserSchema from "./schema/UserSchema";

export interface IUser {
  _id: string,
  email: string,
  username: string,
  phone_number: string,
  created_at: string,
  updated_at: string
}

export const User: Model<IUser> = models.User|| model('User', UserSchema);