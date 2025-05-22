import Feedback from '../models/feedbackModel.js';

// POST - Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { message, email } = req.body;
    const feedback = new Feedback({ message, email });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};

// GET - Fetch latest 5 feedbacks
const getLatestFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ created_at: -1 }).limit(5);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};

export { submitFeedback, getLatestFeedbacks };