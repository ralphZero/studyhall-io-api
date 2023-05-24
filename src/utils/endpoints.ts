export interface Routes {
  base: string;
  plans: string;
  tasks: string;
  byPlanId: string;
  byTaskId: string;
}

export interface Endpoints {
  route: Routes;
}

// ---

export const route: Routes = {
  base: '/',
  plans: '/plans',
  byPlanId: '/:planId',
  tasks: '/plans/:planId/tasks',
  byTaskId: '/:taskId',
};

export const endpoints: Endpoints = {
  route,
};
