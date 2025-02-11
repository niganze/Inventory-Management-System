import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  borrower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
  assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrow_date: { type: Date, default: Date.now },
  expected_return_date: { type: Date, required: true },
  return_date: { type: Date, default: null },
  initial_condition: { type: String, enum: ['New', 'Good', 'Worn Out', 'Broken'], default: 'Good' },
  return_condition: { type: String, enum: ['New', 'Good', 'Worn Out', 'Broken'], default: null },
  is_overdue: { type: Boolean, default: false }
});

export default mongoose.model('Borrowing', borrowingSchema);
