import { create } from 'zustand';
import axios from 'axios';

// Function to load todos from localStorage
const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : null;
};

// Function to save todos to localStorage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const useTodoStore = create((set) => ({
    todos: loadTodosFromLocalStorage() || [],  // Load from localStorage if available
    loading: !loadTodosFromLocalStorage(),     // Set loading based on localStorage availability
    error: null,

    // Fetch data from API or localStorage
    fetchTodos: async () => {
        if (loadTodosFromLocalStorage()) {
            set({ loading: false });
            return;  // Skip fetching if we already have todos in localStorage
        }

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            const todos = response.data.slice(0, 10);  // Fetch first 10 tasks
            set({ todos, loading: false });
            saveTodosToLocalStorage(todos);  // Save to localStorage
        } catch (error) {
            set({ error: 'Ошибка загрузки данных', loading: false });
        }
    },

    // Add a new task
    addTodo: (task) => set((state) => {
        const newTodo = { id: Date.now(), task, completed: false };
        const updatedTodos = [...state.todos, newTodo];
        saveTodosToLocalStorage(updatedTodos);  // Save to localStorage
        return { todos: updatedTodos };
    }),

    // Remove a task
    removeTodo: (id) => set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        saveTodosToLocalStorage(updatedTodos);  // Save to localStorage
        return { todos: updatedTodos };
    }),

    // Toggle the completed status of a task
    toggleTodo: (id) => set((state) => {
        const updatedTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodosToLocalStorage(updatedTodos);  // Save to localStorage
        return { todos: updatedTodos };
    }),
}));

export default useTodoStore;
