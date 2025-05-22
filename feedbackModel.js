import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;