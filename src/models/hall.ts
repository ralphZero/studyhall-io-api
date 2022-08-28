import { PlanDate } from "./plandate";
import { Task } from "./task";

export interface Hall {
    id?: string,
    userId: string,
    title: string,
    startTimeStamp: string,
    endTimeStamp: string,
    progress: number,
    dates: PlanDate[],
    tasks: Task[],
}