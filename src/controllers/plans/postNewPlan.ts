import { Request, Response } from 'express';

export const postNewPlan = (req: Request, res: Response) => {
  res.status(201).send({ success: true, data: null, error: null });
};
