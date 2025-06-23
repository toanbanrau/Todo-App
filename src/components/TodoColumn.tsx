import type { Todo, TodoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoForm from "./TodoForm";

import TodoItem from "./TodoItem";
interface TodoColumnProps {
  status: TodoStatus;
  todos: Todo[];
}

const TodoColumn = ({ status, todos }: TodoColumnProps) => {
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
    <div className="w-[17rem] bg-[#f1f2f4] border-1 border-gray-300 rounded-md overflow-hidden">
      <h2 className="flex justify-center font-bold border-b border-gray-400 ">
        {status}
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="overflow-y-auto max-h-80 space-y-4 pt-5 pb-5  "
      >
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>
      <TodoForm status={status} />
    </div>
  );
};

export default TodoColumn;
