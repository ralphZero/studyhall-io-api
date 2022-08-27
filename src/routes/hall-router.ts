import {Router, Request, Response} from 'express';
import { Hall } from '../models/hall';
import HallServices from '../services/hall-services';

export const hallRouter = Router();

hallRouter.get('/:uid', async (req: Request, res: Response) => {
    const { uid } = req.params;
    const halls = await HallServices.getHallsOfCurrentUser(uid);
    res.status(200).json({result: halls, success: true});
});

hallRouter.post('/', async (req: Request, res: Response) => {
    const newHall: Hall = req.body
    if (!newHall.userId) {
        res.status(400).json({ success: false, message: "A user is required." })
    } else {
        const result = await HallServices.createHallAndReturnIt(newHall)
        res.status(201).json({result, success: true});
    }
});