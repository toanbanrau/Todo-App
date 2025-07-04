import { useTodoStore } from "../stores/useTodoStore";
import { todoStatus, type Todo, type TodoFormInput } from "../interfaces/todo";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WithContext as ReactTags, type Tag } from "react-tag-input";

import IconCancel from "./icons/IconCancel";

import "../assets/styles/reactTag.css";
import { useEffect } from "react";
import { checkThumbnail } from "../lib/utils";

interface todoFormProps {
  status: todoStatus;
  onClose: () => void;
  todo?: Todo;
}

const TodoForm = ({ status, todo, onClose }: todoFormProps) => {
  const schema = z.object({
    title: z.string().min(1, "Tên không đc bỏ trống"),
    description: z.string(),
    tags: z.array(z.string()),
    deadline: z.string().min(1, "Vui lòng chọn deadline"),
    priority: z.enum(["low", "medium", "high"]),
    status: z.nativeEnum(todoStatus),
    thumbnail: z.string().min(1, "Không đc bỏ trống ảnh"),
  });
  const { addTodo, updateTodo } = useTodoStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TodoFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      thumbnail: "",
      priority: "low",
      deadline: "",
      status: status,
    },
  });

  useEffect(() => {
    if (todo) {
      reset({ ...todo, deadline: toDatetimeLocal(todo.deadline) });
      return;
    }
    reset();
  }, [todo, reset, status]);

  const onsubmit = (data: TodoFormInput) => {
    if (todo && todo.id) {
      updateTodo(todo.id, data);
      onClose();
      reset();
      return;
    }
    addTodo({ ...data });
    reset();
  };

  function toDatetimeLocal(dateStr?: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  }

  return (
    <div className="fixed   inset-0 a bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="mx-2 overflow-y-auto mb-2 max-w-[30rem] max-h-full md:gap-4 gap-2 border-2 border-gray-300 p-5 rounded-2xl bg-white"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-title" className="font-medium text-gray-700">
            Title
          </label>
          <input
            id="todo-title"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            {...register("title")}
            placeholder="Add Todo"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-desc" className="font-medium text-gray-700">
            Description
          </label>
          <input
            id="todo-desc"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            {...register("description")}
            placeholder="Add Description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium text-gray-700">
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const { value, onChange } = field;
              const tags = value.map((text: string) => ({
                id: "",
                text,
                className: "my-tag",
              }));
              const handleDelete = (index: number) => {
                onChange(value.filter((_, i) => i !== index));
              };
              const handleAddition = (tag: Tag) => {
                if (
                  value.some(
                    (t: string) =>
                      t.trim().toLowerCase() === tag.text.trim().toLowerCase(),
                  )
                ) {
                  return;
                }
                onChange([...value, tag.text]);
              };
              return (
                <ReactTags
                  tags={tags}
                  handleDelete={handleDelete}
                  inputFieldPosition="top"
                  handleAddition={handleAddition}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            {...register("status")}
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {Object.values(todoStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-deadline" className="font-medium text-gray-700">
            Deadline
          </label>
          <input
            id="todo-deadline"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="datetime-local"
            lang="en-GB"
            {...register("deadline")}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="todo-title" className="font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            id="todo-title"
            className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            {...register("thumbnail", {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i, // Basic URL regex
                message: "Invalid URL format",
              },
            })}
            placeholder="Add Todo"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
          {watch("thumbnail") && (
            <img
              src={watch("thumbnail")}
              alt="Thumbnail"
              className="w-full h-40 object-cover rounded mb-4 border"
            />
          )}
        </div>
        <div className="flex items-center pl-7 pt-7">
          <button
            className="cursor-pointer px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
            type="submit"
          >
            {todo ? "Update" : "Add"}
          </button>
          <button className="ml-5 hover:bg-gray-300 cursor-pointer">
            {" "}
            <IconCancel onClick={() => onClose()} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
