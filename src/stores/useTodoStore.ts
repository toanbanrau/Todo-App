import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '../interfaces/todo';

interface TodoState {
  todos: Todo[];
  addTodo: (todo:Omit<Todo,'id' | 'createdAt' | 'completed' >) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}



export const useTodoStore = create<TodoState>()(
  persist((set)=>({
    todos:[],
    addTodo:(todo)=>set((state)=>({
      todos:[...state.todos,{...todo, id:crypto.randomUUID(), createdAt:Date.now(), completed:false }]
    })),
    updateTodo:(id, todo)=>set((state)=>({
      todos:state.todos.map((t)=>t.id === id ? {...t, ...todo} : t)
    })),
    deleteTodo:(id)=>set((state)=>({
      todos:state.todos.filter((t)=>t.id !== id)
    })),
    toggleTodo:(id)=>set((state)=>({
      todos:state.todos.map((t)=>t.id === id ? {...t, completed:!t.completed} : t)
    }))
  }),
  {
    name:'todo-storage',
  }
  )
);