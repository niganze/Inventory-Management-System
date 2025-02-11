import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Device', 'Furniture', 'Cleaning Material', 'Utensil'],
    required: true 
  },
  serial_number: { type: String, unique: true, required: true },
  condition: { type: String, enum: ['New', 'Good', 'Worn Out', 'Broken'], default: 'New' },
  status: { 
    type: String, 
    enum: ['Available', 'Borrowed', 'Damaged', 'Disposed'],
    default: 'Available'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('InventoryItem', inventoryItemSchema);