import { Task } from './task.model';

export interface SprintGeneral {
  active: boolean;
  startDate: string;
  endDate: string;
  _id?: string;
  tasks?: Task[];
  index?: number;
}

export enum TaskType {
  STORY = 'story',
  TASK = 'task',
  DEFECT = 'defect'
}

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'progress',
  IN_REVIEW = 'review',
  IN_VERIFICATION = 'verification',
  READY = 'ready'
}
