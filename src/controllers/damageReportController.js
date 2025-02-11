import DamageReport from '../models/DamageReport.js';

// Create a damage report
export const createDamageReport = async (req, res) => {
  try {
    const { item_id, reported_by, damage_reason } = req.body;
    const damageReport = new DamageReport({ item_id, reported_by, damage_reason });
    await damageReport.save();
    res.status(201).json({ message: 'Damage report created successfully', damageReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all damage reports
export const getAllDamageReports = async (req, res) => {
  try {
    const damageReports = await DamageReport.find().populate('item_id reported_by');
    res.status(200).json(damageReports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
