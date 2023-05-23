import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { hallRouter } from './src/routes/hall-router';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', hallRouter);

export const devApi = app;
export const api = functions.https.onRequest(app);
