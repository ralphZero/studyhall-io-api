import { ObjectId } from "mongodb";
import { v4 as uuid } from 'uuid';
import { getDb } from "../db/dbconnect";
import { Task } from "../models/task";

interface TaskServices {
    createTask(hallId: string, task: Task): Promise<Task>;
}

const createTask = async (hallId: string, task: Task): Promise<Task> => {
    const db = await getDb();
    task.id = uuid();

    const result = await db.collection<Task>('halls').findOneAndUpdate(
        { _id: new ObjectId(hallId)},
        { $push: { tasks: task } }
    );

    const createdTask = result.value as Task;
    return createdTask;
};

export const TaskServices: TaskServices = { createTask };