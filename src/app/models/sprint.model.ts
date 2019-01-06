export interface SprintTask {
  name: string;
  type: TaskType;
  estimation: number;
  assigned: string;
}

export interface SprintGeneral {
  active: boolean;
  start_date: string;
  end_date: string;
}

export enum TaskType {
  STORY = 'story',
  TASK = 'task',
  SUBTASK = 'subtask',
  DEFECT = 'defect'
}
