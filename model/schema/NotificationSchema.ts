import { Schema } from 'mongoose';

const NotificationSchema = new Schema({
  _id: String,
  recipient_id: String,
  title: String,
  body: String,
  is_read: Boolean,
  image_url: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

export default NotificationSchema;
