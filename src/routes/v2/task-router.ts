import { Router } from 'express';
import { endpoints } from '../../utils/endpoints';
import { TaskController } from '../../controllers';

// api/v2/plans/:planId/tasks
export const taskRouter = Router({ mergeParams: true });

taskRouter.get(endpoints.route.base, TaskController.getAllTasksByPlan);

taskRouter.post(endpoints.route.base, TaskController.postNewTaskByPlan);

taskRouter.patch(endpoints.route.base, TaskController.updateTaskOfPlan);
