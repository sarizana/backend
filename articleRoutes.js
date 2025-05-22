import express from 'express';
import {
  getArticles,
  getArticleById,
  filterArticles,
  getLatestArticles, // ✅ import it
} from '../controllers/articleController.js';

const router = express.Router();

// ✅ These routes must be above the dynamic /:id route
router.get('/filter', filterArticles); 
router.get('/latest', getLatestArticles); // ✅ add this line before /:id

router.get('/', getArticles);
router.get('/:id', getArticleById);

export default router;
