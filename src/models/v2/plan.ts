import { TaskIdObj } from './taskIdObj';

export interface Plan {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  startTimestamp: string;
  endTimestamp: string;
  tasksCount: number;
  completedTasksCount: number;
  taskIdObj?: TaskIdObj;
}
