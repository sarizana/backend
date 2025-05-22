import express from 'express';
import { createRoutine, getRoutineRecommendations } from '../controllers/routineController.js';

const router = express.Router();

// Create routine
router.post('/', createRoutine);

// Get recommendations for a routine
router.get('/:id/recommendations', getRoutineRecommendations);

export default router;
