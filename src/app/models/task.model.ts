import { TaskStatus, TaskType } from './sprint.model';

export interface Task {
  name: string;
  type: TaskType;
  status: TaskStatus;
  estimation?: number;
  parent?: string;
  assigned?: string;
  sprint?: number;
  description?: string;
  subtasks?: Task[];
  _id?: string;
}
