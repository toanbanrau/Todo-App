export enum todoStatus {
  Todo = "todo",
  InProgress = "in_progress",
  Done = "done",
}

export interface Todo {
  id:string;
  title: string;
  description: string;
  status: todoStatus;
  completed: boolean;
  createdAt: number;
}

export type TodoFormInput = Omit<Todo,'id' | 'completed' | 'createdAt'> 