import {Router, Request, Response} from 'express';
import { Hall } from '../models/hall';
import { PlanDate } from '../models/plandate';
import { Task } from '../models/task';
import DateServices from '../services/date-services';
import HallServices from '../services/hall-services';
import { TaskServices } from '../services/task-services';

export const hallRouter = Router();

hallRouter.get('/halls', async (req: Request, res: Response) => {
    const uid: string = req.query.uid as string;
    if (!uid) {
        res.status(400).json({message: "A user id is required", success: false});
    } else {
        const halls = await HallServices.getHallsOfCurrentUser(uid);
        res.status(200).json({result: halls, success: true});
    }
});

hallRouter.post('/halls', async (req: Request, res: Response) => {
    const newHall: Hall = req.body
    if (!newHall.userId) {
        res.status(400).json({ success: false, message: "A user id is required." })
    } else {
        const result = await HallServices.createHallAndReturnIt(newHall)
        res.status(201).json({result, success: true});
    }
});

hallRouter.delete('/halls/:hallId', async (req: Request, res: Response) => {
    const { hallId } = req.params;
    const result = await HallServices.deleteHall(hallId);
    res.status(200).json({ result, success: true });
});

hallRouter.patch('/halls/:hallId/tasks', async (req: Request, res: Response) => {
    const { hallId } = req.params;
    const task: Task = req.body;
    const result: Hall = await TaskServices.createTaskAndReturnHall(hallId, task);
    res.status(201).json({success: true, result});
});

hallRouter.patch('/halls/:hallId/tasks/:taskId', async (req: Request, res: Response) => {
    const { hallId, taskId } = req.params;
    const task: Task = req.body;
    const result: Hall = await TaskServices.updateTaskAndReturnHall(hallId, taskId, task);
    res.status(201).json({ succes: true, result });
});

hallRouter.patch('/halls/:hallId/dates', async (req: Request, res: Response) => {
    const { hallId } = req.params;
    const dates: PlanDate[] = req.body;
    const result = await DateServices.updateDatesInHall(hallId, dates);
    res.status(201).json({ success: true, result });
});
