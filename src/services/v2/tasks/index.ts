interface TaskServiceType {
  getAllTaskOfPlan(): Promise<void>;
}

const getAllTaskOfPlan = async () => {};

export const TaskServic: TaskServiceType = { getAllTaskOfPlan };
