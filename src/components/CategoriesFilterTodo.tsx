
const CategoriesFilterTodo = () => {
   
  
  
  return (
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
  );
};

export default CategoriesFilterTodo;
