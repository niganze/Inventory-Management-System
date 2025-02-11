import express from 'express';
import * as damageReportController from '../controllers/damageReportController.js';

const router = express.Router();

router.post('/', damageReportController.createDamageReport);
router.get('/', damageReportController.getAllDamageReports);

export default router;
