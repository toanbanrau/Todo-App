import { useTodoFilter } from "../hooks/useFilterTodo";
import { todoStatus, type Todo } from "../interfaces/todo";
import { useTodoStore } from "../stores/useTodoStore";
import CategoriesFilterTodo from "./CategoriesFilterTodo";
import ProgressBar from "./ProgressBar";
import TodoColumn from "./TodoColumn";
import TodoForm from "./TodoForm";
import TodoModal from "./TodoModal";

const TodoBoard = () => {
  const { todos } = useTodoStore();
  const { selectedEdit, selectedView, resetSelectedEdit } = useTodoStore();

  const handleCloseAddForm = () => {
    resetSelectedEdit();
  };  
  const { filteredTodos } = useTodoFilter(todos);

  return (
    <div
      className={`w-[100dvw] h-[100dvh] overflow-x-auto bg-no-repeat bg-cover bg-[url('/images/62ed6ea71018a57a3ab0c8c959d78cb0.jpg')]`}
    >
      <div className="my-5">
        <h1 className="flex justify-center text-3xl font-bold">Todo Board</h1>
        <CategoriesFilterTodo />
        <ProgressBar/>
        <div className="flex justify-center gap-4 p-4 min-w-max">
          {Object.values(todoStatus).map((status) => {
            return (
              <TodoColumn
                key={status}
                status={status}
                todos={filteredTodos.filter(
                  (todo: Todo) => todo.status === status,
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
