import moment from "moment";
import { ObjectId } from "mongodb";
import { getDb } from "../db/dbconnect";
import { Hall } from "../models/hall";
import DateServices from "./date-services";

interface HallServices {
    getHallsOfCurrentUser(userId: string): Promise<Hall[]>,
    createHallAndReturnIt(hall: Hall): Promise<Hall>,
    deleteHall(hallId: string): Promise<Hall>,
}

const getHallsOfCurrentUser = async (userId: string): Promise<Hall[]> => {
    const db = await getDb();
    const query = { userId }
    const halls = await db.collection<Hall>('halls').find(query).toArray();
    return halls;
}

const createHallAndReturnIt = async (hall : Hall): Promise<Hall> => {
    const db = await getDb();
    hall.dates = [];
    hall.tasks = [];
    hall.createdAt = moment(Date.now()).toDate().toString();
    hall.progress = 0;

    const formattedStart = moment(hall.startTimeStamp).format("YYYY-MM-DD");
    const formattedEnd = moment(hall.endTimeStamp).format("YYYY-MM-DD");


    const days = DateServices.createDatesFromTimeframe(formattedStart, formattedEnd);


    hall.dates = days;


    hall.dateIds = DateServices.generateIdsFromDates(days);
    

    const insertResult = await db.collection<Hall>('halls').insertOne(hall);

    const insertedHall: Hall = await db.collection<Hall>('halls').findOne({_id: insertResult.insertedId}) as Hall;
    return insertedHall;
}

const deleteHall = async (hallId: string) => {
    const db = await getDb();
    const del = await db.collection<Hall>("halls").findOneAndDelete({_id: new ObjectId(hallId)});
    return del.value as Hall;
}

const HallServices: HallServices = { getHallsOfCurrentUser, createHallAndReturnIt, deleteHall };

export default HallServices;