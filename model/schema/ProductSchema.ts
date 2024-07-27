import { Schema, SchemaTypes } from 'mongoose';

const ProductSchema = new Schema({
  name: String,
  description: String,
  image_url: String,
  state: String,
  closed_at: Date,
  available_at: Date,
  min_order: Number,
  max_order: Number,
  seller_id: String,
  variations: SchemaTypes.Array,
  deleted_at: Date,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

export default ProductSchema;
