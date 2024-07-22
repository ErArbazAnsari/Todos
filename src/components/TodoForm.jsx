import React from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    const [todo, setTodo] = React.useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;

        addTodo({
            todo,
            completed: false,
        });
        setTodo("");
    };
    return (
        <form className="flex" onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-white rounded-l-lg px-3 outline-none text-white duration-150 bg-white/20 py-1.5 text-2xl"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <button
                type="submit"
                className="rounded-r-lg px-3 py-1 bg-[rgb(67,117,225)] text-white shrink-0 text-2xl border border-white active:bg-[rgb(2,45,137)] active:scale-103 duration-50"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
