import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { isDevelop, isLocal } from './src/utils/environment';
import { mainRouterV2 } from './src/routes/v2/main-router-v2';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

if (isDevelop() || isLocal()) {
  app.use('/v2/', mainRouterV2);
}

export const devApi = app;
export const api = functions.https.onRequest(app);
