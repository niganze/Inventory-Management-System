import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, phone_number, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { full_name: user.full_name, role: user.role } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get All Users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };