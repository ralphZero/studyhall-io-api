import { Request, Response } from 'express';
import { CreateTaskDto, createTaskDtoValidation } from '../../dto/task.dto';
import { TaskServices } from '../../services/v2/tasks';
import { HttpException, HttpExceptionError } from '../../utils/http-error';

export const postNewTaskByPlan = async (req: Request, res: Response) => {
  try {
    const planId: string = req.params.planId;
    const payload = req.body as CreateTaskDto;
    payload.planId = planId;

    const { error } = createTaskDtoValidation.validate(payload);

    if (error) {
      throw new HttpException(400, 'Bad request', error.details);
    }

    const result = await TaskServices.addOneTaskToPlan(payload);

    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res
      .status((e as HttpExceptionError).code)
      .send({ success: false, data: null, error: e });
  }
};
