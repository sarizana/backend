import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  text: String,
  senderType: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', messageSchema);
