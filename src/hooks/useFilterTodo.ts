import type { Todo } from "../interfaces/todo";

type TodoQueryParams = {
  priority: "" | "low" | "medium" | "high";
  sortBy: "createdAt" | "deadline";
  sortOrder: "asc" | "desc";
  tag: string;
  nearestDeadline: boolean;
};

export const useTodoFilter = (todo:Todo[]) => {

}