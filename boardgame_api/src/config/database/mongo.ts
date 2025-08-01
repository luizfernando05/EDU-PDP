import mongoose from 'mongoose';

export async function connectMongoDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database');
    process.exit(1);
  }
}
