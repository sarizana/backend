import Product from '../models/productModel.js';

// ✅ Get all products (for testing or general use)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error.message);
    res.status(500).json({ message: error.message });
  }
};
