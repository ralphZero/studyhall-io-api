import { InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import { getDb } from '../../../db/dbconnect';
import { Plan } from '../../../models/v2/plan';
import { UserContext } from '../../../utils/user-context';
import { CreatePlanDto, UpdateTaskIdsDto } from '../../../dto/plan.dto';

interface PlanServiceType {
  getAllPlansFromDb(): Promise<Plan[]>;
  addOnePlanToDb(planDto: CreatePlanDto): Promise<InsertOneResult<Document>>;
  updateOneOrManyTaskIds(taskIdDto: UpdateTaskIdsDto): Promise<UpdateResult>;
}

const getAllPlansFromDb = async (): Promise<Plan[]> => {
  const db = await getDb();
  const user = UserContext.get();
  const query = { userId: user?.uid };
  const plans = await db.collection<Plan>('plans').find(query).toArray();
  return plans;
};

const addOnePlanToDb = async (planDto: CreatePlanDto) => {
  const db = await getDb();
  const user = UserContext.get();
  const createdAt = new Date().getTime().toString();
  const updatedAt = new Date().getTime().toString();
  const progress = 0;
  const userId = user?.uid as string;

  const plan: Plan = { ...planDto, createdAt, updatedAt, progress, userId };
  const result = await db.collection('plans').insertOne(plan);
  return result;
};

const updateOneOrManyTaskIds = async (taskIdDto: UpdateTaskIdsDto) => {
  const db = await getDb();
  const userId = UserContext.get()?.uid;
  const updatedAt = new Date().getTime().toString();
  const query = { userId, _id: new ObjectId(taskIdDto.planId) };
  const result = await db.collection<Plan>('plans').updateOne(
    query,
    {
      $set: { taskIdObj: taskIdDto.taskIdsObj, updatedAt },
    },
    { upsert: true }
  );
  return result;
};

export const PlanServices: PlanServiceType = {
  getAllPlansFromDb,
  addOnePlanToDb,
  updateOneOrManyTaskIds,
};
