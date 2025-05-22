import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String,
  image_url: String,
  created_at: { type: Date, default: Date.now },
  skin_type: [String],
  concerns: [String],
  product_type: [String],
  ingredients: [String],
});

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);
export default Article;
