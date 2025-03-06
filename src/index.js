import dotenv from 'dotenv';
import { app } from "./app.js";
import connectDB from './db/index.js';

dotenv.config({
    path: "./.env"
});

// console.log(process.env.PORT);


connectDB().then(() => {
    app.listen(process.env.PORT || 4040, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log('MongoDB Connection Failed', err);
});
