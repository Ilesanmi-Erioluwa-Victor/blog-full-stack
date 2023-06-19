import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGOOSE_STRING = process.env.MONGODB_URL || undefined;

interface Option {}

const dbConnect = async () => {
  try {
    if (MONGOOSE_STRING === undefined) {
      throw new Error('MongoDB keys not set');
    } else {
      mongoose.set("strictQuery",true)
      return await mongoose.connect(MONGOOSE_STRING,<{}> {
        useNewUrlParser: true,
        useUnifiedTopology:true,
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export default dbConnect;
