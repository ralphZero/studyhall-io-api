import { Router } from 'express';
import { endpoints } from '../../utils/endpoints';
import { PlanController } from '../../controllers/plans';

// route --> api/v2/plans
export const planRouter = Router();

planRouter.get(endpoints.route.base, PlanController.getAllPlans);
