// /src/pages/todo/Add.jsx
import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useTodoStore from "../../store/todoStore"
import axios from "axios";

const TodoForm = () => {
  const { addTodo } = useTodoStore(); // Access addTodo from the store
  const [newTodo, setNewTodo] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [newPriority, setNewPriority] = useState("Low");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newRecurring, setNewRecurring] = useState("");
  const [newTags, setNewTags] = useState("");
  
  // Validation state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const taskCategories = ["Finance", "Personal", "Work", "Bills", "Shopping", "Health"];
  const priorities = ["Low", "Medium", "High"];
  const recurringOptions = ["", "Daily", "Weekly", "Monthly"];

  useEffect(() => {
    // Load todos from local storage when component mounts
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    storedTodos.forEach((todo) => addTodo(todo));
  }, [addTodo]);

  useEffect(() => {
    // Save todos to local storage whenever the todos array changes
    localStorage.setItem("todos", JSON.stringify(useTodoStore.getState().todos));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form inputs
    if (!newTodo.trim()) {
      setErrorMessage("Task cannot be empty.");
      return;
    }
    
    if (!newDueDate) {
      setErrorMessage("Due date is required.");
      return;
    }

    const newTask = {
      text: newTodo,
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate,
      tags: newTags.split(",").map((tag) => tag.trim()),
      completed: false,
      notes: newNotes,
      recurring: newRecurring,
    };

    // Add todo to local state
    addTodo(newTask);

    try {
      // Send the new task to the backend
      await axios.post("/api/todos", newTask);
      setSuccessMessage("Task added successfully!");
    } catch (error) {
      console.error("Error saving todo:", error);
      setErrorMessage("Failed to save the task. Please try again.");
    }

    // Clear the form fields
    setNewTodo("");
    setNewCategory("Personal");
    setNewPriority("Low");
    setNewDueDate("");
    setNewNotes("");
    setNewTags("");
    setNewRecurring("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-purple-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Task</h1>
      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <select
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      >
        {taskCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      >
        {priorities.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <textarea
        placeholder="Add notes..."
        value={newNotes}
        onChange={(e) => setNewNotes(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <select
        value={newRecurring}
        onChange={(e) => setNewRecurring(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      >
        {recurringOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add tags (comma separated)..."
        value={newTags}
        onChange={(e) => setNewTags(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
