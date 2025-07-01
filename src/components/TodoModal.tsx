import React from "react";
import type { Todo } from "../interfaces/todo";

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
}

const checkThumbail = (dataUrl: string) => {
  if (!dataUrl) return;
  if (dataUrl.startsWith("data:image")) return "image";
  if (dataUrl.startsWith("data:video")) return "video";
};

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const checkthumbnai = checkThumbail(todo.thumbnail);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Job Detail
        </h2>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Title
        </label>
        <p className="border-1 border-gray-300 text-gray-800 break-words mb-4">
          {todo.title}
        </p>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Description
        </label>
        <p className="border-1 border-gray-300 text-gray-800 break-words">
          {todo.description}
        </p>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Thumbnail
        </label>
        {checkthumbnai == "image" && (
          <img
            src={todo.thumbnail}
            alt="Thumbnail"
            className="w-full h-40 object-cover rounded mb-4 border"
          />
        )}
        {checkthumbnai == "video" && (
          <video
            src={todo.thumbnail}
            controls
            className="w-full h-40 object-cover rounded mb-4 border"
          />
        )}

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
