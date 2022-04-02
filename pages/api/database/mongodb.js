import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URI;
const initializeDB = async () => {
  try {
    console.log('on initalization ...');
    await mongoose.connect(`${uri}`);
    console.log('DB connected');
  } catch {
    console.log('DB failed to connect');
  }
};

initializeDB();

export const db = mongoose.connection;
