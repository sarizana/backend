
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from './models/articleModel.js';
import articles from './data/article.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log('✅ Articles Imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Import Failed:', error);
    process.exit(1);
  }
};

importData();
