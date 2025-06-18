import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoStatus = 'todo' | 'inProgress' | 'done';

export interface Todo {
  id:number |string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo:Omit<Todo,'id' | 'createdAt' >) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}



export const useTodoStore = create<TodoState>()(
  persist((set)=>({
    todos:[],
    addTodo:(todo)=>set((state)=>({
      todos:[...state.todos,{...todo, id:crypto.randomUUID(), createdAt:new Date()}]
    })),
    updateTodo:(id, todo)=>set((state)=>({
      todos:state.todos.map((t)=>t.id === id ? {...t, ...todo} : t)
    })),
    deleteTodo:(id)=>set((state)=>({
      todos:state.todos.filter((t)=>t.id !== id)
    })),
  }),
  {
    name:'todo-storage',
  }
)
)