import { Request, Response } from 'express';
import { TaskServices } from '../../services/v2/tasks';

export const getAllTasksByPlan = async (req: Request, res: Response) => {
  try {
    const planId: string = req.params.planId;
    const tasks = await TaskServices.getAllTaskOfPlan(planId);
    res.status(200).send({ sucess: true, data: tasks, error: null });
  } catch (e) {
    res.status(200).send({ sucess: false, data: null, error: e });
  }
};
