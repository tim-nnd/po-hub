import { Schema, SchemaType, SchemaTypes } from 'mongoose';

const OrderSchema = new Schema({
  buyer_id: String,
  product_id: String,
  state: String,
  total_price: Number,
  min_order: Number,
  max_order: Number,
  product_detail: Object,
  deleted_at: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

OrderSchema.index({ product_id: 1 });

export default OrderSchema;
