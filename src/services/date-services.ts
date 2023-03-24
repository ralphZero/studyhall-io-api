import { PlanDate } from "../models/plandate";
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Hall } from "../models/hall";
import { getDb } from "../db/dbconnect";
import { ObjectId } from "mongodb";

interface DateServices {
    createDatesFromTimeframe(startDate: string, endDate: string): PlanDate[];
    updateDatesInHall(hallId: string, dates: PlanDate[]): Promise<Hall>;
    generateIdsFromDates(dates: PlanDate[]): string[]
}

const createDatesFromTimeframe = (startDateString: string, endDateString: string): PlanDate[] => {
    const newStartDateString = startDateString + "T12:00:00.000Z";
    const newEndDateString = endDateString + "T12:00:00.000Z";

    const startDate = moment(newStartDateString);
    const endDate = moment(newEndDateString);

    let currentDate = startDate;

    const dateArray: PlanDate[] = [];

    while (currentDate <= endDate) {
        const planDate = {
            id: uuid(),
            date: moment(currentDate.toISOString()).toDate(),
            title: moment(currentDate.toISOString()).format("MMM DD, yyyy"),
            taskIds: []
        };
        dateArray.push(planDate);
        currentDate = moment(currentDate).add(1, "day");
    }
    
    return dateArray;
}

const generateIdsFromDates = (dates: PlanDate[]) => {
    const dateIds = dates.map((date) => date.id);
    return dateIds;
}


const updateDatesInHall = async (hallId: string, dates: PlanDate[]) => {
    const db = await getDb();
    const result = await db.collection<Hall>('halls').findOneAndUpdate(
        { _id: new ObjectId(hallId) },
        { $set: { dates: dates } }
    );
    const updatedHall = result.value as Hall;
    updatedHall.dates = dates
    return updatedHall;
}

const DateServices: DateServices = { createDatesFromTimeframe, updateDatesInHall, generateIdsFromDates };

export default DateServices;