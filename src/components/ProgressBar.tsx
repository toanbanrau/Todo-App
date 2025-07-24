import { useTodoStore } from "../stores/useTodoStore";
import { successTodo } from "../lib/utils";

const ProgressBar = () => {
  const { todos } = useTodoStore();
  const todoCount = todos.length;
  const doneCount = todos.filter((todo) => todo.status === "Done").length;
  const todoSuccess = successTodo(todoCount, doneCount);
  console.log(todoSuccess);

  return (
    <div className="flex justify-center">
      <div className="w-200 h-10">
        <div className="w-full h-full bg-gray-200 rounded-full">
          <div
            style={{ width: `${todoSuccess}%` }}
            className={`h-full bg-red-400 rounded-full`}
          ></div>
        </div>
      </div>
      <div>{todoSuccess}%</div>
    </div>
  );
};

export default ProgressBar;
