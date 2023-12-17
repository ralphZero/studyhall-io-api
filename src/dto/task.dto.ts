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
}

export const createTaskDtoValidation = Validator.object({
  planId: Validator.string().alphanum().required(),
  title: Validator.string().required(),
  labels: Validator.array<Label>().optional(),
  priority: Validator.number().required(),
  deadline: Validator.date().timestamp().cast('string').optional(),
  description: Validator.string().optional(),
  todos: Validator.array<Todo>().optional(),
  timestamp: Validator.date().timestamp().cast('string').required(),
});

// update task
export interface UpdateTaskDto {
  planId: string;
  id: string;
  title: string;
  labels?: Label[];
  priority: number;
  deadline?: string;
  description?: string;
  todos?: Todo[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export const updateTaskDtoValidation = Validator.object({
  planId: Validator.string().alphanum().required(),
  id: Validator.string().alphanum().required(),
  title: Validator.string().required(),
  labels: Validator.array<Label>().optional(),
  priority: Validator.number().optional(),
  deadline: Validator.date().timestamp().cast('string').optional(),
  description: Validator.string().optional(),
  todos: Validator.array<Todo>().optional(),
  timestamp: Validator.date().timestamp().cast('string').required(),
  createdAt: Validator.date().timestamp().cast('string').required(),
  updatedAt: Validator.date().timestamp().cast('string').required(),
});
