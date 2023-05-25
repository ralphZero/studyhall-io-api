export interface Plan {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  startTimeStamp: string;
  endTimeStamp: string;
  progress: number;
}
