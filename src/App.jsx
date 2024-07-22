import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
    const [todos, setTodos] = useState([]);

    // Add a new todo
    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    // Update an existing todo
    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Toggle the completion status of a todo
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    // Load todos from localStorage on component mount
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    // Save todos to localStorage whenever the todos array changes
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
        >
            <div className="bg-[rgb(17,24,39)] min-h-screen py-8 flex justify-center items-center">
                <div className="w-full max-w-2xl bg-[rgb(31,41,55)] shadow-lg rounded-xl px-6 py-8 mx-4 sm:mx-auto border-2 border-white">
                    <h1 className="text-4xl font-bold text-center text-white mb-6">
                        Manage Your Todos
                    </h1>
                    <div className="mb-6">
                        {/* TodoForm component for adding new todos */}
                        <TodoForm />
                    </div>
                    <div className="space-y-4">
                        {/* Map over todos and render TodoItem components */}
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
