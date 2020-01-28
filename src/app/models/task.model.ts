import { TaskStatus, TaskType } from './sprint.model';
import { User } from './user.model';

export interface Task {
  name?: string;
  type?: TaskType;
  status?: TaskStatus;
  estimation?: number;
  parent?: string;
  assigned?: User;
  sprint?: number;
  description?: string;
  subtasks?: Task[];
  _id?: string;
}
