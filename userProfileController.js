// controllers/userProfileController.js
import asyncHandler from 'express-async-handler';
import UserProfile from '../models/userProfileModel.js';

export const saveUserProfile = asyncHandler(async (req, res) => {
  const {
    skinType,
    skinConcerns,
    ingredients,
    skinReaction,
    skincareSteps,
    gender,
    age,
    knowledgeLevel,
  } = req.body;

  if (
    !skinType ||
    !Array.isArray(skinConcerns) || skinConcerns.length === 0 ||
    !Array.isArray(ingredients) || ingredients.length === 0 ||
    !skinReaction ||
    !Array.isArray(skincareSteps) || skincareSteps.length === 0
  ) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existing = await UserProfile.findOne({ user: req.user._id });

  if (existing) {
    existing.skinType = skinType;
    existing.skinConcerns = skinConcerns;
    existing.ingredients = ingredients;
    existing.skinReaction = skinReaction;
    existing.skincareSteps = skincareSteps;
    existing.gender = gender;
    existing.age = age;
    existing.knowledgeLevel = knowledgeLevel;

    const updated = await existing.save();
    res.status(200).json(updated);
  } else {
    const created = await UserProfile.create({
      user: req.user._id,
      skinType,
      skinConcerns,
      ingredients,
      skinReaction,
      skincareSteps,
      gender,
      age,
      knowledgeLevel,
    });
    res.status(201).json(created);
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await UserProfile.findOne({ user: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error('Skin profile not found');
  }

  res.status(200).json(profile);
});