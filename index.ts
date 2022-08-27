import * as functions from 'firebase-functions';
import express from "express";
import cors from "cors";
import { hallRouter } from './src/routes/hall-router';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', hallRouter);


// ndoemon index.ts
// const port: number = 8001;

// app.listen(port,()=> {
//     console.log("Started on localhost:",port)
// })

//firebase emulators:start
export const api = functions.https.onRequest(app);
