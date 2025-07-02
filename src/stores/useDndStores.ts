import {create} from 'zustand';

interface DndState {
  isDragEnter: boolean;
  isDragleave: boolean;
  startEnter: () => void;
  endEnter: () => void;
  startLeave: () => void;
  endLeave: () => void;
}

export const useDnDStores = create<DndState>((set)=>({
  isDragleave:false,
  isDragEnter:false,
  startEnter:()=>set({isDragEnter:true}),
  endEnter:()=>set({isDragEnter:false}),
  startLeave:()=>set({isDragleave:true}),
  endLeave:()=>set({isDragleave:false}),
}));