import { Request, Response } from 'express';
import { getAllPlans } from './plans/getAllPlans';

interface PlanControllerType {
  getAllPlans: (req: Request, res: Response) => void;
}

export const PlanController: PlanControllerType = {
  getAllPlans,
};
