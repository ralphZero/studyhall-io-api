import { Request, Response } from 'express';
import { PlanServices } from '../../services/v2/plans';
import { PlanDto } from '../../dto/plan.dto';

export const postNewPlan = async (req: Request, res: Response) => {
  try {
    const planDto = req.body as PlanDto;
    const result = await PlanServices.addOnePlanToDb(planDto);
    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res.status(400).send({ success: false, data: null, error: e });
  }
};
