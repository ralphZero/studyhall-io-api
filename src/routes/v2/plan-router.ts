import { Router } from 'express';
import { endpoints } from '../../utils/endpoints';
import { getAllPlans } from '../../controllers/plans/getAllPlans';

// route --> api/v2/plans
export const planRouter = Router();

planRouter.get(endpoints.route.base, getAllPlans);
