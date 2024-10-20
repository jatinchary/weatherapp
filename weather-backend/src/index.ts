import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import weatherRoutes from './routes/weatherRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed', error);
  }
}

connectToDatabase();

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
