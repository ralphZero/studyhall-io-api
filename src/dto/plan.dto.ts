import Validator from 'joi';
import { TaskIdObj } from '../models/v2/taskIdObj';

export interface CreatePlanDto {
  title: string;
  description?: string;
  startTimestamp: string;
  endTimestamp: string;
}

export interface UpdateTaskIdsDto {
  planId: string;
  taskIdsObj: TaskIdObj;
}

// Validations
export const createPlanDtoValidation = Validator.object({
  title: Validator.string().required(),
  description: Validator.string().optional(),
  startTimestamp: Validator.date().timestamp().cast('string').required(),
  endTimestamp: Validator.date().timestamp().cast('string').required(),
});

export const updateTaskIdsDtoValidation = Validator.object({
  planId: Validator.string().required(),
  taskIdsObjs: Validator.object(),
});
