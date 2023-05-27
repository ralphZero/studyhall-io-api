import { Router } from 'express';
import { verifyToken } from '../../utils/verify-token';
import { endpoints } from '../../utils/endpoints';
import { planRouter } from './plan-router';
import { taskRouter } from './task-router';

export const mainRouterV2 = Router();

mainRouterV2.use(verifyToken);

// api/v2/plans
mainRouterV2.use(endpoints.route.plans, planRouter);

// api/v2/plans/:planId/tasks
mainRouterV2.use(endpoints.route.tasks, taskRouter);
