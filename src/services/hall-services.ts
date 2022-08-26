import { ObjectId } from "mongodb";
import { getDb } from "../db/dbconnect";
import { Hall } from "../models/hall";

interface HallServices {
    getHallsOfCurrentUser(userId: string): Promise<Hall[]>,
    createHallAndReturnIt(hall: Hall): Promise<Hall>,
}

const getHallById = async (id: ObjectId): Promise<Hall> => {
    const db = await getDb();
    const hall = await db.collection<Hall>('halls').findOne({_id: id});
    return hall as Hall;
}

const getHallsOfCurrentUser = async (userId: string): Promise<Hall[]> => {
    const db = await getDb();
    const query = { userId }
    const halls = await db.collection<Hall>('halls').find(query).toArray();
    return halls;
}

const createHallAndReturnIt = async (hall : Hall) => {
    const db = await getDb();
    const result = await db.collection<Hall>('halls').insertOne(hall);
    const insertedId = result.insertedId;
    return getHallById(insertedId);
}

const hallServices: HallServices = { getHallsOfCurrentUser, createHallAndReturnIt };

export default hallServices;