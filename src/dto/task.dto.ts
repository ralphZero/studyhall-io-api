import { Label, Todo } from '../models/v2/task';

export interface CreateTaskDto {
  planId: string;
  title: string;
  labels?: Label[];
  priority: number;
  deadline?: string;
  description?: string;
  todos?: Todo[];
  timestamp: string;
  progress: number;
  todosCount?: number;
  todosCompletedCount?: number;
  isCompleted?: boolean;
}
