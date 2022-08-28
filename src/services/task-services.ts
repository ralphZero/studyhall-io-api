import { ObjectId } from "mongodb";
import { v4 as uuid } from 'uuid';
import { getDb } from "../db/dbconnect";
import { Hall } from "../models/hall";
import { Task } from "../models/task";

interface TaskServices {
    createTaskAndReturnHall(hallId: string, task: Task): Promise<Hall>;
}

const createTaskAndReturnHall = async (hallId: string, task: Task): Promise<Hall> => {
    const db = await getDb();
    task.id = uuid();

    await db.collection<Hall>('halls').findOneAndUpdate(
        { _id: new ObjectId(hallId)},
        { $push: { tasks: task } }
    );

    const updatedHall = await db.collection<Hall>('halls').findOne(
        {_id: new ObjectId(hallId)}
    );

    return updatedHall as Hall;
};

export const TaskServices: TaskServices = { createTaskAndReturnHall };