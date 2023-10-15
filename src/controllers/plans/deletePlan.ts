import { Request, Response } from 'express';
import { DeletePlanDto, deletePlanDtoValidation } from '../../dto/plan.dto';
import { HttpException } from '../../utils/http-error';
import { PlanServices } from '../../services/v2/plans';

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const planDto = req.body as DeletePlanDto;

    const { error } = deletePlanDtoValidation.validate(planDto);

    if (error) {
      throw new HttpException(400, 'Bad request', error.details);
    }

    const result = await PlanServices.removeOnePlanWithTasksFromDb(planDto);
    res.status(200).send({ success: true, data: result, error: null });
  } catch (error) {
    res.status(400).send({ success: false, data: null, error });
  }
};
