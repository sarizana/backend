import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_range: {
    type: String,
    required: true,
  },
  skinTypes: {
    type: [String],
  },
  ingredients: {
    type: [String],
  },
  concerns: {
    type: [String],
  },
  environment: {
    type: String,
    required: true,
  },
  makeupFrequency: {
    type: [String],
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
