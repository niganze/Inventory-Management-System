import express from 'express';
import * as inventoryController from '../controllers/inventoryController.js';
import { isInventoryManager } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Apply middleware to routes that require Inventory Manager role
router.post('/', isInventoryManager, inventoryController.createItem);
router.put('/:id', isInventoryManager, inventoryController.updateItem);
router.delete('/:id', isInventoryManager, inventoryController.deleteItem);

// Routes for general users (Program Manager or others) can still access these without role check
router.get('/', inventoryController.getAllItems);
router.get('/:id', inventoryController.getItemById);

export default router;
