import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = "todos";

function loadTodos(): Todo[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as Todo[];
    }
  } catch (e) {
    console.log(e);
  }
  return [];
}

function saveTodos(todos: Todo[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.log(e);
  }
}

const todosSlice = createSlice({
  name: "todos",
  initialState: loadTodos(),
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
        saveTodos(state);
      },
      prepare(text: string) {
        return { payload: { id: nanoid(), text, completed: false } };
      },
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos(state);
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const newState = state.filter((t) => t.id !== action.payload);
      saveTodos(newState);
      return newState;
    },
  },
});
export const { addTodo, toggleCompleted, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
