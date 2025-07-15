import { useState } from "react";
import type { Todo, todoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoForm from "./TodoForm";

import TodoItem from "./TodoItem";

interface TodoColumnProps {
  status: todoStatus;
  todos: Todo[];
}

const TodoColumn = ({ status, todos }: TodoColumnProps) => {
  const [startAdd, setStartAdd] = useState(false);
  const [isOver, setIsDragOver] = useState<string | undefined>(undefined);
  const { updateTodo } = useTodoStore();
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(status);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTodoData = e.dataTransfer.getData("text/plain");
    const todo = JSON.parse(draggedTodoData);
    updateTodo(todo.id, { status });
    setIsDragOver(undefined);
  };
  const handleDragLeave = () => {
    setIsDragOver(undefined);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(undefined);
  };

  return (
    <>
      <div
        className={`w-[19rem] self-start bg-[#f1f2f4] border-1 border-gray-300 rounded-md overflow-hidden`}
      >
        <p className="p-4 font-bold text-ms ">{status}</p>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          className={` overflow-y-auto min-h-[10rem] max-h-80 space-y-4`}
        >
          {isOver == status && (
            <div
              className={`text-center py-6 mt-4 rounded-lg mx-2 transition-all duration-200 bg-blue-100 border-2 border-dashed border-blue-400 text-blue-700`}
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
        <TodoForm statusAdd={status} onClose={() => setStartAdd(false)} />
      )}
    </>
  );
};

export default TodoColumn;
