import { useTodoStore, type TodoStatus } from "../stores/useTodoStore";
import TodoColumn from "./TodoColumn";

const TodoBoard = () => {
  const statuses: TodoStatus[] = ["todo", "inProgress", "done"];
  const { todos } = useTodoStore();

  return (
    <div className="w-full h-full overflow-x-auto">
      <h1 className="flex justify-center text-3xl font-bold">Todo Board</h1>
      <div className="flex justify-center gap-4 p-4 min-w-max">
        {statuses.map((status) => {
          return (
            <TodoColumn
              key={status}
              status={status}
              todos={todos
                .filter((todo) => todo.status === status)
                .sort((a, b) => b.createdAt - a.createdAt)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoBoard;
