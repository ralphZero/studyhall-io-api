import moment from "moment";
import { getDb } from "../db/dbconnect";
import { Hall } from "../models/hall";
import DateServices from "./date-services";

interface HallServices {
    getHallsOfCurrentUser(userId: string): Promise<Hall[]>,
    createHallAndReturnIt(hall: Hall): Promise<Hall>,
}

const getHallsOfCurrentUser = async (userId: string): Promise<Hall[]> => {
    const db = await getDb();
    const query = { userId }
    const halls = await db.collection<Hall>('halls').find(query).toArray();
    return halls;
}

const createHallAndReturnIt = async (hall : Hall): Promise<Hall> => {
    // todo: check hall before doing anything
    const db = await getDb();
    hall.dates = [];
    hall.tasks = [];
    hall.createdAt = moment(Date.now()).toDate().toString();
    hall.progress = 0;
    
    const insertResult = await db.collection<Hall>('halls').insertOne(hall);
    const insertedId = insertResult.insertedId;

    const days =  DateServices.createDatesFromTimeframe(hall.startTimeStamp, hall.endTimeStamp);
    
    const updateResult = await db.collection<Hall>('halls').findOneAndUpdate(
        { _id: insertedId }, 
        { $set: { dates: days } }
    );
    const updatedHall: Hall = updateResult.value as Hall;
    updatedHall.dates = days;

    return updatedHall;
}

const HallServices: HallServices = { getHallsOfCurrentUser, createHallAndReturnIt };

export default HallServices;