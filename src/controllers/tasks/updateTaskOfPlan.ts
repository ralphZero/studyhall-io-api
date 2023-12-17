import { Request, Response } from 'express';
import { UpdateTaskDto, updateTaskDtoValidation } from '../../dto/task.dto';
import { HttpException, HttpExceptionError } from '../../utils/http-error';
import { TaskServices } from '../../services/v2/tasks';

export const updateTaskOfPlan = async (req: Request, res: Response) => {
  try {
    const planId: string = req.params.planId;
    const payload = req.body as UpdateTaskDto;
    payload.planId = planId;

    const { error } = updateTaskDtoValidation.validate(payload);

    if (error) {
      throw new HttpException(400, 'Bad request', error.details);
    }

    const result = await TaskServices.updateTaskOfPlan(payload);

    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res
      .status((e as HttpExceptionError).code)
      .send({ success: false, data: null, error: e });
  }
};
