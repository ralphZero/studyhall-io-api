import { Request, Response } from 'express';
import { CreateTaskDto } from '../../dto/task.dto';
import { TaskServices } from '../../services/v2/tasks';

export const postNewTaskByPlan = async (req: Request, res: Response) => {
  try {
    const planId: string = req.params.planId;
    const payload: CreateTaskDto = req.body;
    payload.planId = planId;

    if (
      (typeof payload === 'object' && Object.keys(payload).length === 0) ||
      typeof payload !== 'object' ||
      !payload
    ) {
      throw new Error();
    }

    const result = await TaskServices.addOneTaskToPlan(payload);
    res.status(201).send({ success: true, data: result, error: null });
  } catch (e) {
    res.status(500).send({ success: false, data: null, error: e });
  }
};
