import express from 'express';
import cors from 'cors';


//initilize express app
const app = express();



//CORS error handling
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true
    })
);


//BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






export { app };