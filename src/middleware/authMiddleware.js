// utils/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isInventoryManager = async (req, res, next) => {
  try {
    // Get token from headers (Authorization: Bearer <token>)
    const token = req.headers.authorization?.split(' ')[1];  // Bearer token
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in the request object

    // Check if the user has Inventory Manager role
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'Inventory Manager') {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }

    // User is an Inventory Manager, proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
