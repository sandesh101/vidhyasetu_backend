import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/vidhyasetu`);
        console.log("DB Connection successful 🟢");
    } catch (error) {
        console.log('DB Connection Failed 🔴', error);
        // console.log(error);
        process.exit(1);
    }
}

export default connectDB;