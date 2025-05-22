import asyncHandler from 'express-async-handler';
import UserEmailPreferences from '../models/userEmailPreferencesModel.js';

// GET /api/email-preferences
export const getEmailPreferences = asyncHandler(async (req, res) => {
  const prefs = await UserEmailPreferences.findOne({ user: req.user._id });

  if (!prefs) {
    return res.status(200).json({
      skinSortEmails: true,
      submissionEmails: true,
      notifications: true,
    });
  }

  res.status(200).json(prefs);
});

// PUT /api/email-preferences
export const updateEmailPreferences = asyncHandler(async (req, res) => {
  const { skinSortEmails, submissionEmails, notifications } = req.body;

  let prefs = await UserEmailPreferences.findOne({ user: req.user._id });

  if (!prefs) {
    prefs = new UserEmailPreferences({ user: req.user._id });
  }

  prefs.skinSortEmails = skinSortEmails;
  prefs.submissionEmails = submissionEmails;
  prefs.notifications = notifications;

  await prefs.save();
  res.status(200).json(prefs);
});