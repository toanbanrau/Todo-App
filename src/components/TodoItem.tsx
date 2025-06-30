import { useState } from "react";
import { useTodoStore } from "../stores/useTodoStore";
import IconDelete from "./icons/IconDelete";
import TodoModal from "./TodoModal";
import type { Todo } from "../interfaces/todo";
import IconEdit from "./icons/IconEdit";
import TodoForm from "./TodoForm";

const colorPriorityBadge = {
  high: "border-red-500",
  medium: "border-yellow-400",
  low: "border-green-500",
};

const timeAgo = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditting, setEditting] = useState<string | null>(null);
  const [isModal, setIsModal] = useState(false);

  console.log(todo.deadline);

  const { deleteTodo, toggleTodo } = useTodoStore();

  const startEditting = (todo: Todo) => {
    setEditting(todo.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(todo));
  };

  if (isEditting == todo.id)
    return (
      <TodoForm
        status={todo.status}
        onClose={() => setEditting(null)}
        todo={todo}
      />
    );
  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        className={` mx-2 bg-white rounded-lg border-1 border-gray-300 boder-2 hover:border-blue-400 cursor-move ${colorPriorityBadge[todo.priority]}
           `}
      >
        <div className="flex justify-between">
          <div className="flex pt-2 pl-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label
              onClick={() => setIsModal(true)}
              className="pl-2 block max-w-40 break-words"
            >
              {todo.title}
            </label>
          </div>
          <div className="flex pt-2 ">
            <IconEdit onClick={() => startEditting(todo)} />
            <IconDelete
              onClick={() =>
                window.confirm("Are you sure want to delete") &&
                deleteTodo(todo.id)
              }
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          <span
            className={`mr-2 ${
              todo.deadline &&
              new Date(todo.deadline).getTime() < new Date().getTime()
                ? "text-red-600 font-semibold"
                : ""
            }`}
          >
            <b>Deadline:</b>{" "}
            {todo.deadline &&
              new Date(todo.deadline).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1 flex gap-4">
          <span>Tạo: {todo.createdAt && timeAgo(todo.createdAt)}</span>
          <span>Cập nhật: {todo.updatedAt && timeAgo(todo.updatedAt)}</span>
        </div>
      </div>
      {isModal && (
        <TodoModal
          title={todo.title}
          description={todo.description}
          onClose={() => setIsModal(false)}
        />
      )}
    </>
  );
};

export default TodoItem;
