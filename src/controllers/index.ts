import { deletePlan } from './plans/deletePlan';
import { getAllPlans } from './plans/getAllPlans';
import { postNewPlan } from './plans/postNewPlan';
import { updatePlanTaskIds } from './plans/updatePlanTaskIds';
import { getAllTasksByPlan } from './tasks/getAllTasksByPlan';
import { postNewTaskByPlan } from './tasks/postNewTaskByPlan';
import { updateTaskOfPlan } from './tasks/updateTaskOfPlan';

export const PlanController = {
  getAllPlans,
  postNewPlan,
  updatePlanTaskIds,
  deletePlan,
};

export const TaskController = {
  getAllTasksByPlan,
  postNewTaskByPlan,
  updateTaskOfPlan,
};
