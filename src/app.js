import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import borrowingRoutes from './routes/borrowingRoutes.js';
import personRoutes from './routes/personRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// User routes middleware
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/people', personRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
