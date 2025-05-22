import express from "express";
import { submitFeedback, getLatestFeedbacks } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", submitFeedback);                 // ✅ existing
router.get("/latest", getLatestFeedbacks);        // ✅ add this line

export default router;