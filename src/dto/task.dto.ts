import Validator from 'joi';
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

export const createTaskDtoValidation = Validator.object({
  planId: Validator.string().alphanum().required(),
  title: Validator.string().required(),
  labels: Validator.array<Label>().optional(),
  priority: Validator.number().required(),
  deadline: Validator.string().optional(),
  description: Validator.string().optional(),
  todos: Validator.array<Todo>().optional(),
  timestamp: Validator.string().required(),
  progress: Validator.number().required(),
  todosCount: Validator.number().optional(),
  todosCompletedCount: Validator.number().optional(),
  isCompleted: Validator.boolean().optional(),
});
