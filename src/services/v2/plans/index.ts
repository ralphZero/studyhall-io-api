import { getDb } from '../../../db/dbconnect';
import { Plan } from '../../../models/plan';
import UserContext from '../../../utils/user-context';

interface PlanServiceType {
  getAllPlansFromDb(): Promise<Plan[]>;
}

const getAllPlansFromDb = async (): Promise<Plan[]> => {
  const db = await getDb();
  const user = UserContext.get();
  const query = { userId: user?.uid };

  const plans = await db.collection<Plan>('plans').find(query).toArray();
  return plans;
};

export const PlanServices: PlanServiceType = { getAllPlansFromDb };
