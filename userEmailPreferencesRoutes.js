import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getEmailPreferences,
  updateEmailPreferences,
} from '../controllers/userEmailPreferencesController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getEmailPreferences)
  .put(protect, updateEmailPreferences);

export default router;