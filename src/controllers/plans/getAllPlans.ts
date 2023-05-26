import { Request, Response } from 'express';
import { PlanServices } from '../../services/v2/plans';

export const getAllPlans = async (req: Request, res: Response) => {
  // call method to get all plans
  try {
    const plans = await PlanServices.getAllPlansFromDb();
    res.status(200).send({ success: true, data: plans, error: null });
  } catch (e) {
    res.status(500).send({ success: false, data: null, error: e });
  }
};
