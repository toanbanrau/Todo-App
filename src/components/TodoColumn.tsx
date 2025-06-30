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
  const { updateTodo } = useTodoStore();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTodoData = e.dataTransfer.getData("text/plain");
    const todo = JSON.parse(draggedTodoData);
    updateTodo(todo.id, { status });
  };
  return (
    <div className="w-[17rem] h-a bg-[#f1f2f4] border-1 border-gray-300 rounded-md overflow-hidden">
      <p className=" font-bold text-ms ">{status}</p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="overflow-y-auto max-h-80 space-y-4 pt-5 pb-5  "
      >
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
      {startAdd ? (
        <TodoForm status={status} onClose={() => setStartAdd(false)} />
      ) : (
        <button
          className="block w-full cursor-pointer hover:bg-gray-200 h-8 rounded"
          onClick={() => setStartAdd(true)}
        >
          + Add Todo
        </button>
      )}
    </div>
  );
};

export default TodoColumn;
