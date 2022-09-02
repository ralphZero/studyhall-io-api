import { Subtask } from "./subtask";

export interface Task {
    id?: string,
    dateId: string,
    label: string,
    task: string,
    isComplete: boolean,
    subtasks: Subtask[],
    subtasksCount: number,
    subtasksCompletedCount: number,
    progress: number,
}