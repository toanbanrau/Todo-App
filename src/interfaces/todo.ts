export const statues = ['todo' , 'inProgress' , 'done'];
export type TodoStatus = typeof statues[number]

export interface Todo {
  id:string;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  createdAt: number;
}

export type TodoFormInput = Omit<Todo,'id' | 'completed' | 'createdAt'> 