import SystemLog from '../models/systemLogModel.js';

// Create a system log entry
export const createSystemLog = async (userId, actionType) => {
  try {
    const logEntry = new SystemLog({ user_id: userId, action_type: actionType });
    await logEntry.save();
  } catch (error) {
    console.error('Error logging action:', error);
  }
};

// Get all system logs
export const getAllSystemLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find().populate('user_id');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
