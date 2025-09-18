import TodoForm from "./features/todos/TodoForm";
import TodoList from "./features/todos/TodoList";

function App() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}

export default App;
