import { getDb } from '../../../db/dbconnect';
import { Task } from '../../../models/v2/task';

interface TaskServiceType {
  getAllTaskOfPlan(planId: string): Promise<Task[]>;
}

const getAllTaskOfPlan = async (planId: string): Promise<Task[]> => {
  const db = await getDb();
  const query = { planId };
  const tasks = db.collection<Task>('tasks').find(query).toArray();
  return tasks;
};

export const TaskServices: TaskServiceType = { getAllTaskOfPlan };
