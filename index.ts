import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { hallRouter } from './src/routes/hall-router';
import * as dotenv from 'dotenv';
import { isDevelop } from './src/utils/environment';
import { planRouter } from './src/routes/v2/plan-router';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', hallRouter);

if (isDevelop()) {
  app.use('/v2/', planRouter);
}

export const devApi = app;
export const api = functions.https.onRequest(app);
