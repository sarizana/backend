import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfile, saveUserProfile } from '../controllers/userProfileController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getUserProfile)
  .post(protect, saveUserProfile);

export default router;
