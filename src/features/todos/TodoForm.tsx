import { useState } from "react";
import { useAppDispatch } from "../../store";
import { addTodo } from "./todosSlice";

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      dispatch(addTodo(trimmed));
      setText("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}
