import { useState } from "react";

interface DndState {
  currentColumn?: string
  isDragEnter: boolean;
  isDragleave: boolean;
  startEnter: () => void;
  endEnter: () => void;
  startLeave: () => void;
  endLeave: () => void;
  updateCurrentColumns: (column?: string) => void;
}

export const useDnDStores = ():DndState => {
  const [currentColumn, setCurrentColumn] = useState<string | undefined>(undefined);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isDragleave, setIsDragLeave] = useState(false);

  return {
    currentColumn,
    isDragEnter,
    isDragleave,
    startEnter: () => setIsDragEnter(true),
    endEnter: () => setIsDragEnter(false),
    startLeave: () => setIsDragLeave(true),
    endLeave: () => setIsDragLeave(false),
    updateCurrentColumns:(column?)=>setCurrentColumn(column),
  };
};