import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URI;
export const initializeDB = async () => {
  try {
    console.log('on initalization ...');
    await mongoose.connect(`${uri}`);
    console.log('DB connected');
  } catch {
    console.log('DB failed to connect');
  }
};

export const db = mongoose.connection;
