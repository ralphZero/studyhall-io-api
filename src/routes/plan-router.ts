import { Router } from 'express';
import { endpoints } from '../utils/endpoints';

// route --> api/v2/plans
export const planRouter = Router();

planRouter.get(endpoints.route.base, getAllPlans);
