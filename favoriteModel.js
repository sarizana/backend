// models/favoriteModel.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },

}, {timestamps: true}
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
