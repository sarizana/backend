import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userId).select('-password');

console.log('Decoded user from JWT:', decoded);
console.log('Found user in DB:', req.user);



      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };