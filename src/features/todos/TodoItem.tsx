import { useAppDispatch } from "../../store/store";
import { toggleCompleted, deleteTodo } from "../../store/todosSlice";
import type { Todo } from "../../store/todosSlice";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();

  return (
    <li
      className="flex items-center py-3 border-b last:border-b-0"
      aria-label={
        todo.completed ? "Mark todo as incomplete" : "Mark todo as complete"
      }
    >
      <label
        htmlFor={`todo-${todo.id}`}
        className={`relative flex items-center cursor-pointer select-none flex-grow ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleCompleted(todo.id))}
          className="peer absolute w-6 h-6 opacity-0 cursor-pointer"
        />
        <span className="w-7 h-7 mr-4 rounded-full border-2 border-gray-400 flex justify-center items-center transition-colors peer-checked:border-blue-600 peer-checked:bg-blue-600">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              opacity: todo.completed ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        {todo.text}
      </label>
      <button
        aria-label="Delete todo"
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="ml-4 p-2 text-red-600 hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full transition"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
