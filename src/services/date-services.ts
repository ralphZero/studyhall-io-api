import { PlanDate } from "../models/plandate";
import moment from 'moment';
import { v4 as uuid } from 'uuid';

interface DateServices {
    createDatesFromTimeframe(startDate: string, endDate: string): PlanDate[]
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

const DateServices: DateServices = { createDatesFromTimeframe };

export default DateServices;