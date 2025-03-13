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



//Route handling
//User routes
import userRoute from './routes/user.route.js';
app.use('/api/v1/auth', userRoute);


//College routes
import collegeRoute from './routes/college.route.js';
app.use('/api/v1/college', collegeRoute);

//Semester routes
import semesterRoute from './routes/semester.route.js';
app.use('/api/v1/semester', semesterRoute);






export { app };