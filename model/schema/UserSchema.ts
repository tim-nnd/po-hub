import { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: String,
  email: String,
  username: String,
  phone_number: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

export default UserSchema;
