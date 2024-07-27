import { Schema, SchemaTypes } from 'mongoose';

const OrderSchema = new Schema({
  _id: String,
  buyer_id: String,
  product_id: String,
  state: String,
  min_order: Number,
  max_order: Number,
  details: SchemaTypes.Array,
  deleted_at: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

export default OrderSchema;