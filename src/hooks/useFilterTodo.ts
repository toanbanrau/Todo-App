import { useMemo } from "react";
import type { Todo } from "../interfaces/todo";
import { useSearchParams } from "react-router-dom";

type TodoQueryParams = {
  priority: keyof typeof priorityOptions;
  sortBy: "createdAt" | "deadline";
  sortOrder: "asc" | "desc";
  tag: string;
  nearestDeadline: boolean;
};

export const priorityOptions = {
  all: "All",
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const useTodoFilter = (todo:Todo[]) => {
  const [searchParams,setSearchParams] = useSearchParams();
  const query = useMemo(() => ({
    priority: searchParams.get("priority"),
    sortBy: (searchParams.get("sortBy") as "createdAt" | "deadline") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    tag: searchParams.get("tag") || "",
    nearestDeadline: searchParams.get("nearestDeadline") === "true",
  }), [searchParams]);

  const updateQuery = (newQuery: Partial<TodoQueryParams>) => {
    const updateQuery = {...query,...newQuery};
    const newSearchParams = new URLSearchParams();
    if (updateQuery.priority) newSearchParams.set("priority", updateQuery.priority);
    if (updateQuery.sortBy !== "createdAt") newSearchParams.set("sortBy", updateQuery.sortBy);
    if (updateQuery.sortOrder !== "desc") newSearchParams.set("sortOrder", updateQuery.sortOrder);
    if (updateQuery.tag) newSearchParams.set("tag", updateQuery.tag);
    if (updateQuery.nearestDeadline) newSearchParams.set("nearestDeadline", "true");
    setSearchParams(newSearchParams);
  };

  const filteredTodos = useMemo(() => {
    return todo
      .filter((todo) => {
        if (query.priority && todo.priority !== query.priority && query.priority !== "all") return false;
        if (query.tag && !todo.tags.includes(query.tag)) return false;
        if (query.nearestDeadline && todo.deadline) {
          const deadline = new Date(todo.deadline);
          if (deadline < new Date()) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aValue = new Date(a[query.sortBy]).getTime();
        const bValue = new Date(b[query.sortBy]).getTime();
        return query.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
  }, [todo, query]);

  return { filteredTodos, query, updateQuery };

};