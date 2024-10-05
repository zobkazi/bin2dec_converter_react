// /src/store/todoStore.js
import create from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (index) =>
    set((state) => {
      const todos = [...state.todos];
      todos.splice(index, 1);
      return { todos };
    }),
  toggleComplete: (index) =>
    set((state) => {
      const todos = [...state.todos];
      todos[index].completed = !todos[index].completed;
      return { todos };
    }),
}));

export default useTodoStore;
