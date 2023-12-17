import { InsertOneResult, ObjectId } from 'mongodb';
import { getDb } from '../../../db/dbconnect';
import { CreateTaskDto, UpdateTaskDto } from '../../../dto/task.dto';
import { Task } from '../../../models/v2/task';
import { UserContext } from '../../../utils/user-context';
import { Plan } from '../../../models/v2/plan';

interface TaskServiceType {
  getAllTaskOfPlan(planId: string): Promise<Task[]>;
  addOneTaskToPlan(
    createTaskDto: CreateTaskDto
  ): Promise<InsertOneResult<Document>>;
  updateTaskOfPlan(updateTaskDto: UpdateTaskDto): Promise<void>;
}

const getAllTaskOfPlan = async (planId: string): Promise<Task[]> => {
  const { db } = await getDb();
  const query = { planId };
  const tasks = db.collection<Task>('tasks').find(query).toArray();
  return tasks;
};

const addOneTaskToPlan = async (createTaskDto: CreateTaskDto) => {
  const { db } = await getDb();
  const createdAt = new Date().getTime().toString();
  const updatedAt = new Date().getTime().toString();
  const todos = createTaskDto.todos ?? [];
  const labels = createTaskDto.labels ?? [];
  const deadline = createTaskDto.deadline ?? '';
  const description = createTaskDto.description ?? '';
  const todosCount = createTaskDto.todos?.length ?? 0;
  const todosCompletedCount =
    createTaskDto.todos?.filter((todo) => todo.checked).length ?? 0;
  const progress = todosCount > 0 ? todosCompletedCount / todosCount : 0;
  const isCompleted = progress === 1;

  const task: Task = {
    ...createTaskDto,
    todosCompletedCount,
    todosCount,
    todos,
    labels,
    deadline,
    description,
    progress,
    isCompleted,
    createdAt,
    updatedAt,
  };

  const result = await db.collection('tasks').insertOne(task);

  const userId = UserContext.get()?.uid;
  const query = { userId, _id: new ObjectId(createTaskDto.planId) };
  const taskIdQuery = `taskIdObj.${createTaskDto.timestamp}`;
  await db.collection<Plan>('plans').updateOne(query, {
    $push: { [taskIdQuery]: result.insertedId.toString() },
    $inc: { taskCount: 1 },
    ...(isCompleted && { $inc: { completedTaskCount: 1 } }),
  });
  return result;
};

const updateTaskOfPlan = async (updateTaskDto: UpdateTaskDto) => {
  const { db } = await getDb();
  const updatedAt = new Date().getTime().toString();
  const todos = updateTaskDto.todos ?? [];
  const labels = updateTaskDto.labels ?? [];
  const deadline = updateTaskDto.deadline ?? '';
  const description = updateTaskDto.description ?? '';
  const todosCount = updateTaskDto.todos?.length ?? 0;
  const todosCompletedCount =
    updateTaskDto.todos?.filter((todo) => todo.checked).length ?? 0;
  const progress = todosCount > 0 ? todosCompletedCount / todosCount : 0;
  const isCompleted = progress === 1;

  const task: Task = {
    ...updateTaskDto,
    todosCompletedCount,
    todosCount,
    todos,
    labels,
    deadline,
    description,
    progress,
    isCompleted,
    updatedAt,
  };

  const query = { _id: new ObjectId(task.id) };
  const update = { $set: task };
  const taskUpdate = await db.collection('tasks').updateOne(query, update);

  if (taskUpdate.acknowledged) {
    const filter = { _id: new ObjectId(task.planId) };
    await db.collection('plans').findOneAndUpdate(filter, {});
  }
};

export const TaskServices: TaskServiceType = {
  getAllTaskOfPlan,
  addOneTaskToPlan,
  updateTaskOfPlan,
};
