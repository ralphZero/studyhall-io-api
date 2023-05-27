import { Request, Response } from 'express';
import { PlanServices } from '../../services/v2/plans';
import { UserContext } from '../../utils/user-context';

export const getAllPlans = async (req: Request, res: Response) => {
  // call method to get all plans
  try {
    console.log('from controller', UserContext.get());
    const plans = await PlanServices.getAllPlansFromDb();
    res.status(200).send({ success: true, data: plans, error: null });
  } catch (e) {
    res.status(500).send({ success: false, data: null, error: e });
  }
};
