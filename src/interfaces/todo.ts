export type TodoStatus = 'todo' | 'inProgress' | 'done';

export interface Todo {
  id:string;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  createdAt: number;
}