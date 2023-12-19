import { InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
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
  updateTaskOfPlan(updateTaskDto: UpdateTaskDto): Promise<UpdateResult>;
}

const getAllTaskOfPlan = async (planId: string): Promise<Task[]> => {
  const { db } = await getDb();
  const query = { planId };
  const tasks = db.collection<Task>('tasks').find(query).toArray();
  return tasks;
};

const addOneTaskToPlan = async (createTaskDto: CreateTaskDto) => {
  const { db, client } = await getDb();
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

  const userId = UserContext.get()?.uid;
  let response: InsertOneResult = {
    acknowledged: false,
    insertedId: new ObjectId(),
  };

  await client.withSession(async (session) =>
    session.withTransaction(async () => {
      const taskCollection = db.collection<Task>('tasks');
      const planCollection = db.collection<Plan>('plans');

      const result = await taskCollection.insertOne(task);
      const query = { userId, _id: new ObjectId(createTaskDto.planId) };
      const taskIdQuery = `taskIdObj.${createTaskDto.timestamp}`;

      await planCollection.updateOne(query, {
        $push: { [taskIdQuery]: result.insertedId.toString() },
        $inc: { taskCount: 1 },
        ...(isCompleted && { $inc: { completedTaskCount: 1 } }),
      });

      response = result;
    })
  );
  return response;
};

const updateTaskOfPlan = async (updateTaskDto: UpdateTaskDto) => {
  const { db, client } = await getDb();
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

  const userId = UserContext.get()?.uid;
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

  let response: UpdateResult = {
    acknowledged: false,
    upsertedCount: 0,
    upsertedId: new ObjectId(),
    matchedCount: 0,
    modifiedCount: 0,
  };

  await client.withSession(async (session) =>
    session.withTransaction(async () => {
      const taskCollection = db.collection<Task>('tasks');
      const planCollection = db.collection<Plan>('plans');

      const taskQuery = { _id: new ObjectId(task.id) };

      const taskPreUpdate = await taskCollection.findOne(taskQuery);

      const update = { $set: task };
      const taskUpdate = await db
        .collection('tasks')
        .updateOne(taskQuery, update);

      // update plan counters
      if (taskPreUpdate) {
        const taskPreUpdateIsCompleted =
          taskPreUpdate?.todosCompletedCount / taskPreUpdate?.todosCount === 1;

        const completedTaskCount =
          isCompleted !== taskPreUpdateIsCompleted ? (isCompleted ? 1 : -1) : 0;

        if (completedTaskCount !== 0) {
          const planQuery = { userId, _id: new ObjectId(task.planId) };
          await planCollection.updateOne(planQuery, {
            $inc: { completedTaskCount },
          });
        }
      }

      response = taskUpdate;
    })
  );

  return response;
};

export const TaskServices: TaskServiceType = {
  getAllTaskOfPlan,
  addOneTaskToPlan,
  updateTaskOfPlan,
};
