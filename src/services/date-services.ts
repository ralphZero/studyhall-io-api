import { PlanDate } from "../models/plandate";
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Hall } from "../models/hall";
import { getDb } from "../db/dbconnect";
import { ObjectId } from "mongodb";

interface DateServices {
    createDatesFromTimeframe(startDate: string, endDate: string): PlanDate[];
    updateDatesInHall(hallId: string, dates: PlanDate[]): Promise<Hall>;
}

const createPlanDateList = (startDateString: string, endDateString: string): PlanDate[] => {
    const startDate: Date = moment(startDateString).toDate();
    const endDate: Date = moment(endDateString).toDate();

    let currentDate: Date = startDate;
    const dateArray: PlanDate[] = [];

    while (currentDate <= endDate) {
        const planDate: PlanDate = {
            id: uuid(),
            date: moment(currentDate.toString()).toDate(),
            title: moment(currentDate.toString()).format("dddd Do"),
            taskIds: []
        }
        dateArray.push(planDate);
        currentDate = moment(currentDate.toString()).add(1, 'day').toDate();
    }
    
    return dateArray;
}

const createDatesFromTimeframe = (startDate: string, endDate: string): PlanDate[] => {
    const planDates = createPlanDateList(startDate, endDate);
    return planDates;
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

const DateServices: DateServices = { createDatesFromTimeframe, updateDatesInHall };

export default DateServices;