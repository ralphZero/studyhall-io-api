import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { hallRouter } from './src/routes/hall-router';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/test', (req: Request, res: Response) => {
  res.json({ env: process.env.NODE_ENV });
});

app.use('/', hallRouter);

export const devApi = app;
export const api = functions.https.onRequest(app);
