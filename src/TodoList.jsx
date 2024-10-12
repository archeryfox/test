// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import useTodoStore from './todoStore';

const TodoList = () => {
    const {todos, addTodo, removeTodo, toggleTodo, fetchTodos, loading, error} = useTodoStore();
    const [inputValue, setInputValue] = useState('');

    // Загружаем данные при инициализации компонента
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    if (loading) {
        return <div className="text-center text-lg font-semibold text-blue-500">
            Загрузка данных...
        </div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">
            {error}
        </div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">
                To-Do List
            </h1>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите задачу"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleAddTodo}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Добавить задачу
                </button>
            </div>

            <ul className="space-y-3">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`flex justify-between items-center p-2 border border-gray-300 rounded-lg ${
                            todo.completed ? 'bg-green-100 line-through' : 'bg-white'
                        }`}
                    >
            <span
                onClick={() => toggleTodo(todo.id)}
                className="cursor-pointer text-gray-700"
            >
              {todo.title || todo.task}
            </span>
                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="ml-4 text-red-500 hover:text-red-600"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
