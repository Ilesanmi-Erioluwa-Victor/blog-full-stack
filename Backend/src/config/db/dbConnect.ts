import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGOOSE_STRING = process.env.MONGODB_UR || undefined;

const dbConnect = async () => {
  try {
    if (MONGOOSE_STRING === undefined) {
      throw new Error('MongoDB keys not set');
    }
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGOOSE_STRINGS, {});
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
