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

    const days = DateServices.createDatesFromTimeframe(hall.startTimeStamp, hall.endTimeStamp);
    hall.dates = days;

    const insertResult = await db.collection<Hall>('halls').insertOne(hall);

    const insertedHall: Hall = await db.collection<Hall>('halls').findOne({_id: insertResult.insertedId}) as Hall;
    return insertedHall;
}

const HallServices: HallServices = { getHallsOfCurrentUser, createHallAndReturnIt };

export default HallServices;