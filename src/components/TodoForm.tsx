import { useState } from "react";
import { useTodoStore } from "../stores/useTodoStore";
import IconCancel from "./icons/IconCancel";
import type { TodoFormInput, TodoStatus } from "../interfaces/todo";

const TodoForm = ({ status }: { status: TodoStatus }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startAdd, setStartAdd] = useState(false);
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Tiêu đề không đươc bỏ trống");
      return;
    }
    const newTodo: TodoFormInput = { title, description, status };
    addTodo(newTodo);
    setStartAdd(false);
    setTitle("");
    setDescription("");
  };

  if (startAdd)
    return (
      <form
        onSubmit={handleSubmit}
        className="flex mx-2 mb-2 flex-col gap-4 border-2 border-gray-300 p-5 rounded-2xl bg-white"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            id="todo-title"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Todo"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-desc" className="font-medium text-gray-700">
            Description
          </label>
          <input
            id="todo-desc"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add Description"
          />
        </div>
        <div className="flex items-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
            type="submit"
          >
            Add
          </button>
          <IconCancel
            onClick={() =>
              window.confirm("Are you sure you want to cancel?") &&
              setStartAdd(false)
            }
          />
        </div>
      </form>
    );
  return (
    <button
      className="block w-full cursor-pointer hover:bg-gray-200 h-8 rounded"
      onClick={() => setStartAdd(true)}
    >
      + Add Todo
    </button>
  );
};

export default TodoForm;
