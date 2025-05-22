import Article from '../models/articleModel.js';

// GET /api/articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/articles/:id
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ GET /api/articles/filter?product_type=&skin_type=&ingredients=&concerns=
const filterArticles = async (req, res) => {
  try {
    const { product_type, skin_type, ingredients, concerns } = req.query;

    const query = {};

    if (product_type) query.product_type = product_type;
    if (skin_type) query.skin_type = skin_type;
    if (ingredients) query.ingredients = { $in: ingredients.split(',') };
    if (concerns) query.concerns = { $in: concerns.split(',') };

    const articles = await Article.find(query);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering articles' });
  }
};

  const getLatestArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ created_at: -1 }).limit(5);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest articles' });
  }
};


export { getArticles, getArticleById, filterArticles, getLatestArticles };
