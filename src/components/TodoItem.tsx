import { useTodoStore } from "../stores/useTodoStore";
import IconDelete from "./icons/IconDelete";

import type { Todo } from "../interfaces/todo";
import IconEdit from "./icons/IconEdit";

import { ConfirmDialog } from "./ui/AlertDialog";

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
  const { deleteTodo, toggleTodo, setSelectedEdit, setSelectedView } =
    useTodoStore();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(todo));
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        className={`mx-2 p-2 max-w-[30rem] bg-white rounded-lg border-1 boder-2 hover:border-blue-400 cursor-pointer ${colorPriorityBadge[todo.priority]}
           `}
      >
        <div className="flex justify-between">
          <div className="flex">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label
              onClick={() => setSelectedView(todo.id)}
              className={`${todo.status == "Done" ? "line-through" : ""}  pl-2 block max-w-40 break-words`}
            >
              {todo.title}
            </label>
          </div>
          <div className="flex ">
            <IconEdit onClick={() => setSelectedEdit(todo.id)} />
            <ConfirmDialog
              description="Bạn có chắc muốn xoá công việc này? Hành động không thể hoàn tác."
              onConfirm={() => deleteTodo(todo.id)}
            >
              <IconDelete />
            </ConfirmDialog>
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
    </>
  );
};

export default TodoItem;
