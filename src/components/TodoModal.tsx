import React from "react";
import type { Todo } from "../interfaces/todo";

import { useTodoStore } from "../stores/useTodoStore";

interface TodoModalProps {
  todo: Todo;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo }: TodoModalProps) => {
  const { toggleTodo } = useTodoStore();
  const { resetSelectedView } = useTodoStore();
  console.log(todo);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Job Detail
          </h2>
          <input
            className="w-8"
            type="checkbox"
            checked={todo?.completed}
            onChange={() => toggleTodo(todo.id)}
          />
        </div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Title
        </label>
        <p className="border-1 border-gray-300 text-gray-800 break-words mb-4">
          {todo?.title}
        </p>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Description
        </label>
        <p className="border-1 border-gray-300 text-gray-800 break-words">
          {todo?.description}
        </p>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Thumbnail
        </label>

        <img
          src={todo?.thumbnail}
          alt="Thumbnail"
          className="w-full h-40 object-cover rounded mb-4 border"
        />
        <button
          onClick={resetSelectedView}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
