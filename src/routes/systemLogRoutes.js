import express from 'express';
import * as systemLogController from '../controllers/systemLogController.js';

const router = express.Router();

router.get('/', systemLogController.getAllSystemLogs);

export default router;
