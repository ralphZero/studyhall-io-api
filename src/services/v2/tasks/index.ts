import { InsertOneResult } from 'mongodb';
import { getDb } from '../../../db/dbconnect';
import { CreateTaskDto } from '../../../dto/task.dto';
import { Task } from '../../../models/v2/task';

interface TaskServiceType {
  getAllTaskOfPlan(planId: string): Promise<Task[]>;
  addOneTaskToPlan(
    createTaskDto: CreateTaskDto
  ): Promise<InsertOneResult<Document>>;
}

const getAllTaskOfPlan = async (planId: string): Promise<Task[]> => {
  const db = await getDb();
  const query = { planId };
  const tasks = db.collection<Task>('tasks').find(query).toArray();
  return tasks;
};

const addOneTaskToPlan = async (createTaskDto: CreateTaskDto) => {
  const db = await getDb();
  const createdAt = new Date().getTime().toString();
  const updatedAt = new Date().getTime().toString();
  const todosCount = createTaskDto.todosCount ?? 0;
  const todosCompletedCount = createTaskDto.todosCompletedCount ?? 0;
  const isCompleted = createTaskDto.isCompleted ?? false;
  const todos = createTaskDto.todos ?? [];
  const labels = createTaskDto.labels ?? [];
  const deadline = createTaskDto.deadline ?? '';
  const description = createTaskDto.description ?? '';

  const task: Task = {
    ...createTaskDto,
    todosCompletedCount,
    todosCount,
    todos,
    labels,
    deadline,
    description,
    isCompleted,
    createdAt,
    updatedAt,
  };

  const result = await db.collection('tasks').insertOne(task);
  return result;
};

export const TaskServices: TaskServiceType = {
  getAllTaskOfPlan,
  addOneTaskToPlan,
};
