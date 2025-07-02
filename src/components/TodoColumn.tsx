import { useState } from "react";
import type { Todo, todoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoForm from "./TodoForm";

import TodoItem from "./TodoItem";
import { useDnDStores } from "../stores/useDndStores";
interface TodoColumnProps {
  status: todoStatus;
  todos: Todo[];
}

const TodoColumn = ({ status, todos }: TodoColumnProps) => {
  const [startAdd, setStartAdd] = useState(false);
  const { updateTodo } = useTodoStore();
  const {
    isDragleave,
    isDragEnter,
    startEnter,
    startLeave,
    endEnter,
    endLeave,
  } = useDnDStores();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    startEnter();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTodoData = e.dataTransfer.getData("text/plain");
    const todo = JSON.parse(draggedTodoData);
    updateTodo(todo.id, { status });
    endEnter();
    endLeave();
  };
  const handleDragLeave = () => {
    startLeave();
    endEnter();
  };
  const handleDragEnter = () => {
    startEnter();
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    endLeave();
    endEnter();
  };
  return (
    <>
      <div
        className={`${isDragleave ? "ring-4 ring-blue-400" : ""} w-[17rem] self-start bg-[#f1f2f4] border-1 border-gray-300 rounded-md overflow-hidden`}
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
              className={`${isDragEnter ? "border-2 border-red-500 bg-red-400" : "border-2 border-dashed border-blue-400"} h-12 rounded-lg bg-blue-100 flex items-center mx-2 justify-center mb-2 animate-pulse transition-all duration-200`}
            ></div>
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
