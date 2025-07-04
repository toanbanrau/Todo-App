import { useState } from "react";
import type { Todo, todoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoForm from "./TodoForm";

import TodoItem from "./TodoItem";

interface TodoColumnProps {
  status: todoStatus;
  todos: Todo[];
  isDragEnter: boolean;
  isDragleave: boolean;
  currentColumn?: string;
  updateCurrentColumns: (column?: string) => void;
  startEnter: () => void;
  endEnter: () => void;
  startLeave: () => void;
  endLeave: () => void;
}

const TodoColumn = ({
  status,
  todos,
  isDragleave,
  currentColumn,
  updateCurrentColumns,
  startEnter,
  endEnter,
  startLeave,
  endLeave,
}: TodoColumnProps) => {
  const [startAdd, setStartAdd] = useState(false);
  const { updateTodo } = useTodoStore();

  const isActive = currentColumn === status;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    startEnter();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTodoData = e.dataTransfer.getData("text/plain");
    const todo = JSON.parse(draggedTodoData);
    updateTodo(todo.id, { status });
    endLeave();
    endEnter();
  };
  const handleDragLeave = () => {
    updateCurrentColumns(status);
    startLeave();
    endEnter();
  };
  const handleDragEnter = () => {
    startEnter();
    updateCurrentColumns(status);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    updateCurrentColumns();
    e.preventDefault();
    endLeave();
    endEnter();
  };

  return (
    <>
      <div
        className={`${isDragleave && "ring-4 ring-blue-400 "}w-[17rem] self-start bg-[#f1f2f4] border-1 border-gray-300 rounded-md overflow-hidden`}
      >
        <p className="p-4 font-bold text-ms ">{status}</p>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          className={` overflow-y-auto max-h-80 space-y-4`}
        >
          {isDragleave && (
            <div
              className={`${isActive ? "bg-red-300" : ""} text-center py-8 rounded-lg mx-2 transition-all duration-200 bg-blue-100 border-2 border-dashed border-blue-400 text-blue-700`}
            >
              Thả vào đây để chuyển
            </div>
          )}
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </div>
        <button
          className="block w-full cursor-pointer mt-2 hover:bg-gray-200 h-8 rounded"
          onClick={() => setStartAdd(true)}
        >
          + Add Todo
        </button>
      </div>

      {startAdd && (
        <TodoForm status={status} onClose={() => setStartAdd(false)} />
      )}
    </>
  );
};

export default TodoColumn;
