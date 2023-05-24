import { Router } from 'express';
import { verifyToken } from '../utils/verify-token';

export const planRouter = Router();

planRouter.use(verifyToken);
