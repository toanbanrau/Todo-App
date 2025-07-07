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
      className={`w-[100dvw] h-[100dvh] overflow-x-auto bg-no-repeat bg-cover bg-[url('../../public/images/62ed6ea71018a57a3ab0c8c959d78cb0.jpg')]`}
    >
      <div className="my-10">
        <h1 className="flex justify-center text-3xl font-bold">Todo Board</h1>
        <div className="grid justify-center min-w-max">
          <div className="grid grid-cols-3 gap-20">
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
