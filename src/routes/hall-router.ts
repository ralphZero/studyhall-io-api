import {Router, Request, Response} from 'express';
import hallServices from '../services/hall-services';

export const hallRouter = Router();

hallRouter.get('/', async (req: Request, res: Response) => {
    const { uid } = req.params;
    const halls = await hallServices.getHallsOfCurrentUser(uid);
    res.status(200).json(halls);
})