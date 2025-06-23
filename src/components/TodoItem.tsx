import { useState } from "react";
import { useTodoStore, type Todo } from "../stores/useTodoStore";
import IconDelete from "./icons/IconDelete";
import TodoModal from "./TodoModal";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodoStore();

  const [isEditting, setEditting] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [isModal, setIsModal] = useState(false);

  const startEditting = (todo: Todo) => {
    setEditting(todo.id);
    setEditTitle(todo.title);
  };
  const handleSave = (id: string) => {
    updateTodo(id, { title: editTitle });
    setEditting(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(todo));
  };

  return (
    <>
      {isEditting == todo.id ? (
        <div className="bg-white p-4 rounded-lg border-1 border-gray-300 boder-2 hover:border-blue-300">
          <input
            className="border-1 border-gray-300 p-2 rounded-lg"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            type="text"
          />
          <button onClick={() => handleSave(todo.id)}>Save</button>
        </div>
      ) : (
        <div
          draggable
          onDragStart={handleDragStart}
          onClick={() => setIsModal(true)}
          className="flex justify-between mx-2 bg-white p-4 rounded-lg border-1 border-gray-300 boder-2 hover:border-blue-400 cursor-move"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label
              className="p-2 block max-w-40 break-words"
              onClick={() => startEditting(todo)}
            >
              {todo.title}
            </label>
          </div>
          <IconDelete onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
      {isModal && (
        <TodoModal
          title={todo.title}
          description={todo.description}
          onClose={() => setIsModal(false)}
        />
      )}
    </>
  );
};

export default TodoItem;
