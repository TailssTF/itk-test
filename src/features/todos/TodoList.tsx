import { useAppSelector } from "../../store/store";
import TodoItem from "./TodoItem";
import type { Todo } from "../../store/todosSlice";
import { useState } from "react";

const FILTER_MAP = {
  all: () => true,
  active: (todo: Todo) => !todo.completed,
  completed: (todo: Todo) => todo.completed,
};
type FilterKey = keyof typeof FILTER_MAP;

export default function TodoList() {
  const todos = useAppSelector((state) => state.todos);
  const [filter, setFilter] = useState<FilterKey>("all");

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  return (
    <section>
      <div className="mb-4 flex justify-center gap-4">
        {(["all", "active", "completed"] as FilterKey[]).map((key) => (
          <button
            key={key}
            className={`px-3 py-1 rounded ${
              filter === key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
          >
            {key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-gray-300 border border-gray-300 rounded-md px-4">
        {filteredTodos.length ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <li className="p-4 text-center text-gray-500 select-none">
            No todos to display
          </li>
        )}
      </ul>
    </section>
  );
}
