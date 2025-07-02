import { todoStatus } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import TodoColumn from "./TodoColumn";

const TodoBoard = () => {
  const { todos } = useTodoStore();

  return (
    <div className="w-[100dvw] h-[100dvh] overflow-x-auto bg-[url('https://sp.yimg.com/ib/th?id=OIP.DYhQa3mulI4koJOgZonbtQHaEO&pid=Api&w=148&h=148&c=7&dpr=2&rs=1')]">
      <div className="my-10">
        <h1 className="flex justify-center text-3xl font-bold">Todo Board</h1>
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
    </div>
  );
};

export default TodoBoard;
