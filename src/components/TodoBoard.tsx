import { todoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoColumn from "./TodoColumn";
import TodoForm from "./TodoForm";
import TodoModal from "./TodoModal";

const TodoBoard = () => {
  const { todos } = useTodoStore();
  const { selectedEdit, selectedView, resetSelectedEdit } = useTodoStore();

  const handleCloseAddForm = () => {
    resetSelectedEdit();
  };

  return (
    <div
      className={`w-[100dvw] h-[100dvh] overflow-x-auto bg-no-repeat bg-cover bg-[url('/images/62ed6ea71018a57a3ab0c8c959d78cb0.jpg')]`}
    >
      <div className="my-10">
        <h1 className="flex justify-center text-3xl font-bold">Todo Board</h1>
        <div className="flex gap-4 justify-center mb-4">
          <select
            className="border rounded px-2 py-1 bg-[#f1f2f4]"
            // value={query.priority || ""}
            // onChange={(e) =>
            //   setQuery((q) => ({ ...q, priority: e.target.value || undefined }))
            // }
          >
            <option value="">Tất cả ưu tiên</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            className="border rounded px-2 py-1 bg-[#f1f2f4]"
            // value={query.sortBy || ""}
            // onChange={(e) =>
            //   setQuery((q) => ({
            //     ...q,
            //     sortBy: e.target.value as "createdAt" | "deadline",
            //   }))
            // }
          >
            <option value="createdAt">Sort: Ngày tạo</option>
            <option value="deadline">Sort: Deadline</option>
          </select>
          <select
            className="border rounded px-2 py-1 bg-[#f1f2f4]"
            // value={query.sortOrder || ""}
            // onChange={(e) =>
            //   setQuery((q) => ({
            //     ...q,
            //     sortOrder: e.target.value as "asc" | "desc",
            //   }))
            // }
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
          <input
            className="border rounded px-2 py-1 bg-[#f1f2f4]"
            placeholder="Tag..."
            // value={query.tag || ""}
            // onChange={(e) =>
            //   setQuery((q) => ({ ...q, tag: e.target.value || undefined }))
            // }
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              // checked={!!query.nearestDeadline}
              // onChange={(e) =>
              //   setQuery((q) => ({ ...q, nearestDeadline: e.target.checked }))
              // }
            />
            Deadline gần nhất
          </label>
        </div>
        <div className="flex justify-center gap-4 p-4 min-w-max">
          {Object.values(todoStatus).map((status) => {
            return (
              <TodoColumn
                key={status}
                status={status}
                todos={todos
                  .filter((todo) => todo.status === status)
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )}
              />
            );
          })}
        </div>
      </div>
      {selectedView && (
        <TodoModal todo={todos.find((todo) => todo.id === selectedView)!} />
      )}
      {selectedEdit && (
        <TodoForm
          todo={todos.find((todo) => todo.id === selectedEdit)!}
          onClose={handleCloseAddForm}
        />
      )}
    </div>
  );
};

export default TodoBoard;
