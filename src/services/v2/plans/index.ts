import { InsertOneResult } from 'mongodb';
import { getDb } from '../../../db/dbconnect';
import { Plan } from '../../../models/v2/plan';
import { UserContext } from '../../../utils/user-context';
import { PlanDto } from '../../../dto/plan.dto';

interface PlanServiceType {
  getAllPlansFromDb(): Promise<Plan[]>;
  addOnePlanToDb(planDto: PlanDto): Promise<InsertOneResult<Document>>;
}

const getAllPlansFromDb = async (): Promise<Plan[]> => {
  const db = await getDb();
  const user = UserContext.get();
  const query = { userId: user?.uid };
  console.log(user);
  const plans = await db.collection<Plan>('plans').find(query).toArray();
  return plans;
};

const addOnePlanToDb = async (planDto: PlanDto) => {
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

export const PlanServices: PlanServiceType = {
  getAllPlansFromDb,
  addOnePlanToDb,
};
