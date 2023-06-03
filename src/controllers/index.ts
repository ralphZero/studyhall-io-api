import { getAllPlans } from './plans/getAllPlans';
import { postNewPlan } from './plans/postNewPlan';
import { getAllTasksByPlan } from './tasks/getAllTasksByPlan';
import { postNewTaskByPlan } from './tasks/postNewTaskByPlan';

export const PlanController = {
  getAllPlans,
  postNewPlan,
};

export const TaskController = {
  getAllTasksByPlan,
  postNewTaskByPlan,
};
