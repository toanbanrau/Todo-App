export enum todoStatus {
  Todo = "Todo",
  InProgress = "Inprogress",
  Done = "Done",
}

type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id:string;
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  thumbnail:string;
  status: todoStatus;
  tags: string[];
  completed: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export type TodoFormInput = Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>;