import Validator from 'joi';

export interface createPlanDto {
  title: string;
  description?: string;
  startTimestamp: string;
  endTimestamp: string;
}

export const createPlanDtoValidation = Validator.object({
  title: Validator.string().required(),
  description: Validator.string().optional(),
  startTimestamp: Validator.date().timestamp().cast('string').required(),
  endTimestamp: Validator.date().timestamp().cast('string').required(),
});
