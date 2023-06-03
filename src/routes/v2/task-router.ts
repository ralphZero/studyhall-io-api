import { Router } from 'express';
import { endpoints } from '../../utils/endpoints';
import { TaskController } from '../../controllers';

// api/v2/plans/:planId/tasks
export const taskRouter = Router();

taskRouter.get(endpoints.route.base, TaskController.getAllTasksByPlan);
