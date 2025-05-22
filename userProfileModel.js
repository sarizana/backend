// models/userProfileModel.js
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    skinType: { type: String, required: true },
    skinConcerns: { type: [String], required: true },
    ingredients: { type: [String], required: true },
    skinReaction: { type: String, required: true },
    skincareSteps: { type: [String], required: true },

    // NEW fields
    gender: { type: String, required: false },
    age: { type: String, required: false },
    knowledgeLevel: { type: String, required: false },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;