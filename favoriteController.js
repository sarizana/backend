// controllers/favoritesController.js
import Favorite from '../models/favoriteModel.js';

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ userId }).populate('articleId');
    res.json(favorites.map(fav => fav.articleId));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

export const addFavorite = async (req, res) => {
  const { articleId } = req.body;
  const userId = req.user._id;

  console.log("Adding favorite -> user:", userId, "articleId:", articleId); // 🐞 log

  try {
    const exists = await Favorite.findOne({ userId, articleId });
    if (exists) return res.status(400).json({ message: 'Already favorited' });

    const favorite = await Favorite.create({ userId, articleId });
    res.status(201).json(favorite);
  } catch (err) {
    console.error("Add favorite error:", err); // helpful error
    res.status(500).json({ message: 'Error adding favorite' });
  }
};



export const removeFavorite = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    await Favorite.findOneAndDelete({ userId, articleId });
    res.json({ message: 'Favorite removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing favorite' });
  }
};
