import { Router } from 'express';
import { endpoints } from '../../utils/endpoints';
import { PlanController } from '../../controllers';

// route --> api/v2/plans
export const planRouter = Router();

planRouter.get(endpoints.route.base, PlanController.getAllPlans);

planRouter.post(endpoints.route.base, PlanController.postNewPlan);

planRouter.patch(endpoints.route.byPlanId, PlanController.updatePlanTaskIds);

planRouter.delete(endpoints.route.base, PlanController.deletePlan);
