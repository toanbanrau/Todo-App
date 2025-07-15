import { priorityOptions, useTodoFilter } from "../hooks/useFilterTodo";
import { useTodoStore } from "../stores/useTodoStore";

const CategoriesFilterTodo = () => {
  const { todos } = useTodoStore();
  const { query, updateQuery } = useTodoFilter(todos);

  return (
    <div className="flex gap-4 justify-center mb-4">
      <select
        className="border rounded px-2 py-1 bg-[#f1f2f4]"
        value={query.priority || ""}
        onChange={(e) =>
          updateQuery({
            priority: e.target.value as keyof typeof priorityOptions,
          })
        }
      >
        {Object.entries(priorityOptions).map(([priority, value]) => (
          <option key={priority} value={priority}>
            {value}
          </option>
        ))}
      </select>
      <select
        className="border rounded px-2 py-1 bg-[#f1f2f4]"
        value={query.sortBy || ""}
        onChange={(e) =>
          updateQuery({
            sortBy: e.target.value as "createdAt" | "deadline",
          })
        }
      >
        <option value="createdAt">Sort: Ngày tạo</option>
        <option value="deadline">Sort: Deadline</option>
      </select>
      <select
        className="border rounded px-2 py-1 bg-[#f1f2f4]"
        value={query.sortOrder || ""}
        onChange={(e) =>
          updateQuery({
            sortOrder: e.target.value as "asc" | "desc",
          })
        }
      >
        <option value="desc">Mới nhất</option>
        <option value="asc">Cũ nhất</option>
      </select>
      <input
        className="border rounded px-2 py-1 bg-[#f1f2f4]"
        placeholder="Tag..."
        value={query.tag || ""}
        onChange={(e) => updateQuery({ tag: e.target.value || undefined })}
      />
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={!!query.nearestDeadline}
          onChange={(e) => updateQuery({ nearestDeadline: e.target.checked })}
        />
        Deadline gần nhất
      </label>
    </div>
  );
};

export default CategoriesFilterTodo;
