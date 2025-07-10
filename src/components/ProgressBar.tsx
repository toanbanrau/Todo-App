import { successTodo } from "../lib/utils";
import { useTodoStore } from "../stores/useTodoStore";

const ProgressBar = () => {
  const { todos } = useTodoStore();
  const totalTodo = todos.length;
  const totalDone = todos.filter((todo) => todo.status === "Done").length;
  const totalSuccess = successTodo(totalTodo, totalDone);

  return (
    <div className="flex justify-center mb-4">
      <div className="w-96 h-4 bg-gray-200 rounded-full">
        <div
          className="h-4 bg-blue-500 rounded-full"
          style={{ width: `${totalSuccess}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
