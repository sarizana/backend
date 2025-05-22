import mongoose from 'mongoose';

const userEmailPreferencesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  skinSortEmails: {
    type: Boolean,
    default: true,
  },
  submissionEmails: {
    type: Boolean,
    default: true,
  },
  notifications: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const UserEmailPreferences = mongoose.model('UserEmailPreferences', userEmailPreferencesSchema);

export default UserEmailPreferences;