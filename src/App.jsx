import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputText, setInputText] = useState("");

    // Load saved tasks when app first loads
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks"); // Fixed: consistent key name
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Function to add new task
    const addTask = () => {
        if (inputText.trim() === "") {
            // Fixed: added parentheses to trim()
            return;
        }

        const newTask = {
            id: Date.now(), // Fixed: added parentheses to Date.now()
            text: inputText,
            completed: false,
        };

        setTasks([newTask, ...tasks]);
        setInputText("");
    }; // Fixed: moved this closing brace to properly close addTask

    // Function to delete a task - MOVED OUTSIDE addTask
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Function to toggle task completion - MOVED OUTSIDE addTask
    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundImage: `url('/background.png')` }}
        >
            <div
                className="bg-white shadow-lg rounded-3xl p-16"
                style={{
                    backgroundImage: `url('/fractalize.png')`,
                }}
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    To-Do App
                </h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTask()} // Added: Enter key support
                        placeholder="Lets do it!"
                        className="flex-grow px-3 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addTask}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-6 ml-1 border border-gray-400 rounded shadow"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2 ">
                    {tasks.length === 0 ? (
                        <p className="text-gray-800 font-bold">
                            No tasks yet. Add one above!
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                        className="w-5 h-5 cursor-pointer"
                                    />
                                    <span
                                        className={`${
                                            task.completed
                                                ? "line-through text-gray-400"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700 font-bold px-2"
                                >
                                    x
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;
