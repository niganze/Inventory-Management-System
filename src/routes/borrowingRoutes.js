import express from 'express';
import * as borrowController from '../controllers/borrowController.js';

const router = express.Router();

router.post('/', borrowController.createBorrowRecord);
router.put('/:borrowId/return', borrowController.returnItem);
router.get('/overdue', borrowController.getOverdueItems);

export default router;