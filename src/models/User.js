import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: { type: String, enum: ['Program Manager', 'Inventory Manager'], required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
