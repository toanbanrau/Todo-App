import { useState } from "react";
import { useTodoStore } from "../stores/useTodoStore";
import IconCancel from "./icons/IconCancel";

import "../assets/styles/reactTag.css";
import { useEffect } from "react";
import { checkThumbnail } from "../lib/utils";
import { toast } from "sonner";

interface todoFormProps {
  statusAdd?: todoStatus;
  onClose: () => void;
  todo?: Todo;
}

const TodoForm = ({ statusAdd, todo, onClose }: todoFormProps) => {
  const schema = z.object({
    title: z.string().min(1, "Tên không đc bỏ trống"),
    description: z.string(),
    tags: z.array(z.string()).max(8, "Tối đa 8 ký tự tag"),
    deadline: z.string().min(1, "Vui lòng chọn deadline"),
    priority: z.enum(["low", "medium", "high"]),
    status: z.nativeEnum(todoStatus),
    thumbnail: z
      .string()
      .min(1, "Không đc bỏ trống ảnh")
      .refine(async (value) => {
        return await checkThumbnail(value);
      }, "Ảnh k hợp lệ"),
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
      status: statusAdd,
    },
  });

  useEffect(() => {
    if (todo) {
      reset({ ...todo, deadline: toDatetimeLocal(todo.deadline) });
      return;
    }
    reset();
  }, [todo, reset, statusAdd]);

  const onsubmit = (data: TodoFormInput) => {
    if (todo?.id) {
      updateTodo(todo.id, data);
      onClose();
      toast("Cập nhật thành công");
      reset();
      return;
    }
    addTodo({ ...data });
    reset();
    toast("Thêm mới thành công");
    onClose();
    return;
  };

  function toDatetimeLocal(dateStr?: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 16);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col max-h-[90vh] min-w-[20rem] border-2 border-gray-300 p-5 rounded-2xl bg-white"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">
            {todo ? "Update Todo" : "Add Todo"}
          </h1>
          <button className=" flex content-center items-center hover:bg-gray-300 cursor-pointer">
            {" "}
            <IconCancel onClick={() => onClose()} />
          </button>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto max-h-full p-2">
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

          <div className="flex flex-col">
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
                    if (tag.text.trim().length > 8) return;
                    if (
                      value.some(
                        (t: string) =>
                          t.trim().toLowerCase() ===
                          tag.text.trim().toLowerCase(),
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
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="todo-desc" className="font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Add Description"
              className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              {...register("description")}
              name=""
              id=""
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                Status
              </label>
              <select
                id="priority"
                {...register("status")}
                className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {Object.values(todoStatus).map((statusAdd) => (
                  <option key={statusAdd} value={statusAdd}>
                    {statusAdd}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="todo-deadline"
                className="font-medium text-gray-700"
              >
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
                <p className="text-red-500 text-sm">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          <div className="fex flex-col">
            <div className="flex flex-col gap-1">
              <label htmlFor="todo-title" className="font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                id="todo-title"
                className="px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                type="text"
                {...register("thumbnail")}
                placeholder="Add thumnail"
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>
            <div className=" py-2">
              {watch("thumbnail") && (
                <img
                  src={watch("thumbnail")}
                  alt="Thumbnail"
                  className="h-30 object-cover rounded border"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-between gap-1 p-2">
          <button
            className="cursor-pointer w-full px-8 py-2 bg-gradient-to-b from-violet-500 to-pink-500 text-white rounded font-semibold"
            type="submit"
          >
            {todo ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
