import mongoose from 'mongoose';

const damageReportSchema = new mongoose.Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  reported_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reported_date: { type: Date, default: Date.now },
  damage_reason: { type: String, required: true },
  repair_status: { type: String, enum: ['Pending', 'Repaired', 'Disposed'], default: 'Pending' }
});

export default mongoose.model('DamageReport', damageReportSchema);
