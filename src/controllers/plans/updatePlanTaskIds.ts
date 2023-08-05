import { Request, Response } from 'express';
import {
  UpdateTaskIdsDto,
  updateTaskIdsDtoValidation,
} from '../../dto/plan.dto';
import { HttpException, HttpExceptionError } from '../../utils/http-error';
import { PlanServices } from '../../services/v2/plans';

export const updatePlanTaskIds = async (req: Request, res: Response) => {
  try {
    const payload = req.body as UpdateTaskIdsDto;
    const planId: string = req.params.planId;
    payload.planId = payload.planId ?? planId;

    const { error } = updateTaskIdsDtoValidation.validate(payload);

    if (error) {
      throw new HttpException(400, 'Bad request', error.details);
    }

    const result = await PlanServices.updateOneOrManyTaskIds(payload);

    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res
      .status((e as HttpExceptionError).code)
      .send({ success: false, data: null, error: e });
  }
};
