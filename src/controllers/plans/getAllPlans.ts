import { Request, Response } from 'express';

export const getAllPlans = (req: Request, res: Response) => {
  // call method to get all plans

  // return response
  res.status(200).send('all plans');
};
