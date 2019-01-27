export interface SprintTask {
  name: string;
  type: TaskType;
  estimation?: number;
  // parent?: string;
  assigned?: string;
  sprint?: number;
  description?: string;
}

export interface SprintGeneral {
  active: boolean;
  start_date: string;
  end_date: string;
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
