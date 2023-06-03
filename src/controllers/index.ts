import { getAllPlans } from './plans/getAllPlans';
import { postNewPlan } from './plans/postNewPlan';
import { getAllTasksByPlan } from './tasks/getAllTasksByPlan';

export const PlanController = {
  getAllPlans,
  postNewPlan,
};

export const TaskController = {
  getAllTasksByPlan,
};
