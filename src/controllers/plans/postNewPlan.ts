import { Request, Response } from 'express';
import { PlanServices } from '../../services/v2/plans';
import { CreatePlanDto, createPlanDtoValidation } from '../../dto/plan.dto';
import { HttpException } from '../../utils/http-error';

export const postNewPlan = async (req: Request, res: Response) => {
  try {
    const planDto = req.body as CreatePlanDto;

    const { error } = createPlanDtoValidation.validate(planDto);
    if (error) {
      throw new HttpException(400, 'Bad request', error.details);
    }

    const result = await PlanServices.addOnePlanToDb(planDto);
    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res.status(400).send({ success: false, data: null, error: e });
  }
};
