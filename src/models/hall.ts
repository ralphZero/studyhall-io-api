import { PlanDate } from "./plandate";

export interface Hall {
    id?: string,
    userId: string,
    title: string,
    startTimeStamp: string,
    endTimeStamp: string,
    dates: PlanDate[]
}