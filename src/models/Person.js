import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nationalId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  residence: { type: String, required: true },
  assurerName: { type: String },
  assurerContact: { type: String }
}, { timestamps: true });

export default mongoose.model('Person', personSchema);