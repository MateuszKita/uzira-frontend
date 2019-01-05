export interface SprintTask {
  name: string;
  type: TaskType;
  estimation: number;
  assigned: string;
}

export enum TaskType {
  STORY = 'story',
  TASK = 'task',
  SUBTASK = 'subtask',
  DEFECT = 'defect'
}
