import { ObjectId } from "mongodb";
import { v4 as uuid } from 'uuid';
import { getDb } from "../db/dbconnect";
import { Hall } from "../models/hall";
import { Task } from "../models/task";

interface TaskServices {
    createTaskAndReturnHall(hallId: string, task: Task): Promise<Hall>;
    updateTaskAndReturnHall(hallId: string, taskId: string, task: Task): Promise<Hall>;
}

const createTaskAndReturnHall = async (hallId: string, task: Task): Promise<Hall> => {
    const db = await getDb();
    task.id = uuid();

    const updated = await db.collection<Hall>('halls').findOneAndUpdate(
        { _id: new ObjectId(hallId), "dates.id": task.dateId },
        { $push: { tasks: task, "dates.$.taskIds": task.id } }
    );

    const tempHall = updated.value as Hall;
    tempHall.tasks.push(task);

    const totalTasks = tempHall.tasks.length;
    const totalCompletedTasks = tempHall.tasks.filter((task) => task.isComplete === true).length;
    const progress = totalCompletedTasks / totalTasks;

    await db.collection<Hall>('halls').updateOne(
        {_id: new ObjectId(hallId)},
        { $set: { progress: progress } }
    );

    const updatedHall = await db.collection<Hall>('halls').findOne(
        { _id: new ObjectId(hallId) }
    );

    return updatedHall as Hall;
};

const updateTaskAndReturnHall = async (hallId: string, taskId: string, task: Task): Promise<Hall> => {
    const db = await getDb();
    const query = { _id: new ObjectId(hallId), 'tasks.id': taskId };

    await db.collection<Hall>('halls').updateOne(query, { $set: { 'tasks.$': task } });
    const updatedHall = await db.collection<Hall>('halls').findOne(
        { _id: new ObjectId(hallId) }
    ) as Hall;

    const totalTasks = updatedHall.tasks.length;
    const totalCompletedTasks = updatedHall.tasks.filter((task) => task.isComplete === true).length;
    const progress = totalCompletedTasks / totalTasks;

    await db.collection<Hall>('halls').updateOne({ _id: new ObjectId(hallId) }, { $set: { 'progress': progress } });
    const newHall = await db.collection<Hall>('halls').findOne(
        { _id: new ObjectId(hallId) }
    ) as Hall;
    
    return newHall as Hall;
}

export const TaskServices: TaskServices = { createTaskAndReturnHall, updateTaskAndReturnHall };