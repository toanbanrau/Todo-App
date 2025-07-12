import { useTodoStore } from "../stores/useTodoStore";
import { successTodo } from "../lib/utils";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const { todos } = useTodoStore();
  const todoCount = todos.length;
  const doneCount = todos.filter((todo) => todo.status === "Done").length;
  const totalTodoSuccess = successTodo(todoCount, doneCount);

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(totalTodoSuccess);
    }, 500);
    return () => clearTimeout(timer);
  }, [totalTodoSuccess]);

  return (
    <div className="mb-5">
      <Progress
        value={progressValue}
        className={`w-full h-5 ${
          progressValue < 20
            ? "[&>div]:bg-red-500"
            : progressValue < 50
              ? "[&>div]:bg-yellow-500"
              : "[&>div]:bg-green-500"
        } bg-white`}
      />
      <div className="relative w-full ">
        <div
          className={`absolute -translate-y-8 -translate-x-1/2 w-12 h-12  rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-300 ease-out ${
            progressValue < 20
              ? "bg-red-500"
              : progressValue < 50
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
          style={{
            left: `${progressValue}%`,
          }}
        >
          {progressValue}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
