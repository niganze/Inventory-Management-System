import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import borrowingRoutes from './routes/borrowingRoutes.js';
import personRoutes from './routes/personRoutes.js';
import damageReportRoutes from './routes/damageReportRoutes.js';
import systemLogRoutes from './routes/systemLogRoutes.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


// Load Swagger YAML file
const swaggerDocument = yaml.load('./src/docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// User routes middleware
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/people', personRoutes);
app.use('/api/damage-reports', damageReportRoutes);
app.use('/api/system-logs', systemLogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
