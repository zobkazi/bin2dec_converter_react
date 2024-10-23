import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [newPriority, setNewPriority] = useState("Low");
  const [newDueDate, setNewDueDate] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newRecurring, setNewRecurring] = useState("");
  const [newTags, setNewTags] = useState("");

  const taskCategories = [
    "Finance",
    "Personal",
    "Work",
    "Bills",
    "Shopping",
    "Health",
  ];
  const priorities = ["Low", "Medium", "High"];
  const recurringOptions = ["", "Daily", "Weekly", "Monthly"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() && newDueDate) {
      addTodo({
        text: newTodo,
        category: newCategory,
        priority: newPriority,
        dueDate: newDueDate,
        tags: newTags.split(",").map((tag) => tag.trim()),
        completed: false,
        subtasks: [],
        notes: newNotes,
        recurring: newRecurring,
      });

      // Clear the form
      setNewTodo("");
      setNewCategory("Personal");
      setNewPriority("Low");
      setNewDueDate("");
      setNewNotes("");
      setNewTags("");
      setNewRecurring("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-purple-400 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Task</h1>
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
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
      >
        Add Task
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
