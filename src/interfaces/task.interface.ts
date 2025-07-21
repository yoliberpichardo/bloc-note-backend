export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface TaskStore {
  [id: string]: Task;
}