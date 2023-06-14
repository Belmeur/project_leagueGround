import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config'
import profileRoute from './routes/profileRoute.js';
import rankingRoute from './routes/rankingRoute.js';

// console.log(process.env);

const app = express();
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(bodyParser.json({limit: '30mb', extended: true}));

app.use(cors());

app.use('/profile', profileRoute);
app.use('/ranking', rankingRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() =>app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))).catch((error) => console.log(error.message));

