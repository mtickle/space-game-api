import dotenv from 'dotenv'; // <-- Import dotenv
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config(); // <-- Configure it here

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in your .env file.');
        }

        const conn = await mongoose.connect(mongoUri);

        //console.log(`🔌 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        //console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;