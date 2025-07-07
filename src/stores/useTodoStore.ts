import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { todoStatus, type Todo } from '../interfaces/todo';

interface TodoState {
  todos: Todo[];
  selectedEdit: string | null;
  selectedView: string | null;
  addTodo: (todo:Omit<Todo,'id' | 'createdAt' | 'completed' | 'updatedAt' >) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setSelectedEdit: (id: string | null) => void;
  setSelectedView: (id: string | null) => void;
  resetSelectedEdit: () => void;
  resetSelectedView: () => void;
}



export const useTodoStore = create<TodoState>()(
  persist((set)=>({
    todos:[],
    selectedEdit:null,
    selectedView:null,
    addTodo:(todo)=>set((state)=>({
      todos:[...state.todos,{...todo, id:crypto.randomUUID(), createdAt: new Date().toString(),updatedAt: null, completed:false }]
    })),
    updateTodo:(id, todo)=>set((state)=>({
      todos:state.todos.map((t)=>t.id === id ? {...t, ...todo,updatedAt:new Date().toString()} : t)
    })),
    deleteTodo:(id)=>set((state)=>({
      todos:state.todos.filter((t)=>t.id !== id)
    })),
    toggleTodo:(id)=>set((state)=>({
      todos:state.todos.map((t)=>t.id === id ? {...t, completed:!t.completed,updatedAt:new Date().toString(),status:t.completed ? todoStatus.InProgress : todoStatus.Done } : t)
    })),
    setSelectedEdit:(id)=>set({selectedEdit:id}),
    setSelectedView:(id)=>set({selectedView:id}),
    resetSelectedEdit:()=>set({selectedEdit:null}),
    resetSelectedView:()=>set({selectedView:null}),
  }),
  {
    name:'todo-storage',
  }
  )
);