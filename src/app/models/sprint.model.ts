export interface SprintTask {
  name: string;
  type: TaskType;
  status: TaskStatus;
  estimation?: number;
  // parent?: string;
  assigned?: string;
  sprint?: number;
  description?: string;
  subtasks?: SprintTask[];
  id?: number;
}

export interface SprintGeneral {
  active: boolean;
  start_date: string;
  end_date: string;
  inner_id?: number;
  id?: number;
  tasks?: SprintTask[];
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
