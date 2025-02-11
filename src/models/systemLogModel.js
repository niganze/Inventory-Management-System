import mongoose from 'mongoose';

const systemLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action_type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('SystemLog', systemLogSchema);
