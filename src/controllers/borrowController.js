import BorrowRecord from '../models/BorrowRecord.js';
import InventoryItem from '../models/InventoryItem.js';

export const createBorrowRecord = async (req, res) => {
  try {
    const { itemId, borrowerId, expectedReturnDate } = req.body;
    
    // Check if item is available
    const item = await InventoryItem.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.status !== 'Available') return res.status(400).json({ message: 'Item is not available' });

    const borrowRecord = new BorrowRecord({
      item: itemId,
      borrower: borrowerId,
      assignedBy: req.user.id, // Assuming middleware sets req.user
      expectedReturnDate
    });

    // Update item status
    item.status = 'Borrowed';
    await item.save();

    const savedRecord = await borrowRecord.save();
    await savedRecord.populate(['item', 'borrower', 'assignedBy']);
    
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const returnItem = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const { returnCondition } = req.body;

    const borrowRecord = await BorrowRecord.findById(borrowId);
    if (!borrowRecord) return res.status(404).json({ message: 'Borrow record not found' });

    // Update borrow record
    borrowRecord.returnDate = new Date();
    borrowRecord.returnCondition = returnCondition;
    await borrowRecord.save();

    // Update item status
    const item = await InventoryItem.findById(borrowRecord.item);
    item.status = 'Available';
    item.condition = returnCondition;
    await item.save();

    res.status(200).json(borrowRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOverdueItems = async (req, res) => {
  try {
    const overdueRecords = await BorrowRecord.find({
      returnDate: null,
      expectedReturnDate: { $lt: new Date() }
    }).populate(['item', 'borrower']);
    
    res.status(200).json(overdueRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};