import { PlanDate } from "../models/plandate";
import { v4 as uuid } from 'uuid';

interface DateServices {
    createDatesFromTimeframe(startDate: string, endDate: string): PlanDate[]
}

const createPlanDateList = (startDateString: string, endDateString: string): PlanDate[] => {
    const startDate: Date = new Date(startDateString);
    const endDate: Date = new Date(endDateString);

    console.log(startDate, endDate, "<--- fron date.services");
    

    let currentDate: Date = startDate;
    const dateArray: PlanDate[] = [];
    
    var days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    while (currentDate <= endDate) {
        const planDate: PlanDate = {
            id: uuid(),
            date: currentDate,
            title: `${days[currentDate.getDay()]} ${currentDate.getMonth()}/${currentDate.getDate()}`,
        }
        dateArray.push(planDate);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    console.log(dateArray);
    
    return dateArray;
}

const createDatesFromTimeframe = (startDate: string, endDate: string): PlanDate[] => {
    const planDates = createPlanDateList(startDate, endDate);
    return planDates;
}

const DateServices: DateServices = { createDatesFromTimeframe };

export default DateServices;