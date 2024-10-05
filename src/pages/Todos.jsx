// import { useState } from "react";

// const initialTasks = [
//   { text: "Complete Tax Refill Task", category: "Finance", priority: "High", dueDate: "2024-10-15", tags: ["urgent"], completed: false, subtasks: [], notes: "", recurring: "" },
//   { text: "Grocery Shopping", category: "Personal", priority: "Medium", dueDate: "2024-10-07", tags: ["home"], completed: false, subtasks: [], notes: "", recurring: "" },
//   { text: "Pay Electricity Bill", category: "Bills", priority: "High", dueDate: "2024-10-10", tags: ["bills"], completed: false, subtasks: [], notes: "", recurring: "monthly" },
// ];

// function App() {
//   const [todos, setTodos] = useState(initialTasks);
//   const [newTodo, setNewTodo] = useState("");
//   const [newCategory, setNewCategory] = useState("Personal");
//   const [newPriority, setNewPriority] = useState("Low");
//   const [newDueDate, setNewDueDate] = useState("");
//   const [newNotes, setNewNotes] = useState("");
//   const [newRecurring, setNewRecurring] = useState("");
//   const [newTags, setNewTags] = useState("");
  
//   const taskCategories = ["Finance", "Personal", "Work", "Bills", "Shopping", "Health"];
//   const priorities = ["Low", "Medium", "High"];
//   const recurringOptions = ["", "Daily", "Weekly", "Monthly"];

//   // Add a new task
//   const addTodo = () => {
//     if (newTodo.trim() !== "" && newDueDate !== "") {
//       setTodos([
//         ...todos,
//         {
//           text: newTodo,
//           category: newCategory,
//           priority: newPriority,
//           dueDate: newDueDate,
//           tags: newTags.split(",").map(tag => tag.trim()), // Split tags by commas
//           completed: false,
//           subtasks: [],
//           notes: newNotes,
//           recurring: newRecurring,
//         },
//       ]);
//       setNewTodo("");
//       setNewCategory("Personal");
//       setNewPriority("Low");
//       setNewDueDate("");
//       setNewNotes("");
//       setNewTags("");
//       setNewRecurring("");
//     }
//   };

//   // Toggle task completion
//   const toggleComplete = (index) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index].completed = !updatedTodos[index].completed;
//     setTodos(updatedTodos);
//   };

//   // Remove a task
//   const removeTodo = (index) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//   };

//   // Calculate completion percentage
//   const completionPercentage = Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">Advanced Todo App</h1>
        
//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 rounded-full mb-4">
//           <div
//             className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
//             style={{ width: `${completionPercentage}%` }}
//           >
//             {completionPercentage}% Completed
//           </div>
//         </div>

//         {/* Input for new task */}
//         <div className="flex mb-4">
//           <input
//             type="text"
//             className="border rounded-lg p-2 w-full mr-2"
//             placeholder="Add a new task..."
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//           />
//         </div>

//         <div className="mb-4 flex justify-between">
//           {/* Category Select */}
//           <select
//             className="border rounded-lg p-2 w-full mr-2"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//           >
//             {taskCategories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
          
//           {/* Priority Select */}
//           <select
//             className="border rounded-lg p-2 w-full"
//             value={newPriority}
//             onChange={(e) => setNewPriority(e.target.value)}
//           >
//             {priorities.map((priority) => (
//               <option key={priority} value={priority}>
//                 {priority}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Due Date */}
//         <div className="mb-4">
//           <input
//             type="date"
//             className="border rounded-lg p-2 w-full"
//             value={newDueDate}
//             onChange={(e) => setNewDueDate(e.target.value)}
//           />
//         </div>

//         {/* Notes */}
//         <div className="mb-4">
//           <textarea
//             className="border rounded-lg p-2 w-full"
//             placeholder="Add notes..."
//             value={newNotes}
//             onChange={(e) => setNewNotes(e.target.value)}
//           />
//         </div>

//         {/* Recurring */}
//         <div className="mb-4">
//           <select
//             className="border rounded-lg p-2 w-full"
//             value={newRecurring}
//             onChange={(e) => setNewRecurring(e.target.value)}
//           >
//             {recurringOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Tags */}
//         <div className="mb-4">
//           <input
//             type="text"
//             className="border rounded-lg p-2 w-full"
//             placeholder="Add tags (comma separated)..."
//             value={newTags}
//             onChange={(e) => setNewTags(e.target.value)}
//           />
//         </div>

//         <button
//           onClick={addTodo}
//           className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
//         >
//           Add Task
//         </button>

//         {/* Task List */}
//         <ul className="mt-4">
//           {todos.length === 0 ? (
//             <p className="text-center text-gray-500">No tasks added yet!</p>
//           ) : (
//             todos.map((todo, index) => (
//               <li
//                 key={index}
//                 className={`flex justify-between items-center p-2 mb-2 ${
//                   todo.completed ? "line-through text-gray-500" : ""
//                 } bg-gray-100 rounded-lg`}
//               >
//                 <div>
//                   <span
//                     className={`cursor-pointer ${
//                       todo.completed ? "text-gray-500" : "text-black"
//                     }`}
//                     onClick={() => toggleComplete(index)}
//                   >
//                     {todo.text}
//                   </span>
//                   <div className="text-xs text-gray-500">
//                     Category: {todo.category}, Priority: {todo.priority}, Due:{" "}
//                     {todo.dueDate}, Recurring: {todo.recurring || "No"}
//                   </div>
//                   <div className="text-xs text-gray-500">Tags: {todo.tags.join(", ")}</div>
//                   <div className="text-xs text-gray-500">Notes: {todo.notes}</div>
//                 </div>
//                 <button
//                   onClick={() => removeTodo(index)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";

const initialTasks = {
  Taxes: [
    { text: "Complete Tax Refill Task", priority: "High", dueDate: "2024-10-15", completed: false },
  ],
  Work: [
    { text: "Finish React Project", priority: "Medium", dueDate: "2024-10-10", completed: false },
  ],
  Personal: [
    { text: "Grocery Shopping", priority: "Low", dueDate: "2024-10-07", completed: false },
  ],
};

function TodoApp() {
  const [activeTab, setActiveTab] = useState("Taxes"); // Default to "Taxes"
  const [todos, setTodos] = useState(initialTasks);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("Low");
  const [newDueDate, setNewDueDate] = useState("");

  // Add a new task to the active compartment
  const addTodo = () => {
    if (newTodo.trim() !== "" && newDueDate !== "") {
      setTodos({
        ...todos,
        [activeTab]: [
          ...todos[activeTab],
          {
            text: newTodo,
            priority: newPriority,
            dueDate: newDueDate,
            completed: false,
          },
        ],
      });
      setNewTodo("");
      setNewPriority("Low");
      setNewDueDate("");
    }
  };

  // Toggle task completion in the active compartment
  const toggleComplete = (index) => {
    const updatedTodos = [...todos[activeTab]];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos({
      ...todos,
      [activeTab]: updatedTodos,
    });
  };

  // Remove a task in the active compartment
  const removeTodo = (index) => {
    const updatedTodos = todos[activeTab].filter((_, i) => i !== index);
    setTodos({
      ...todos,
      [activeTab]: updatedTodos,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Compartmentalized Todo App</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-between mb-4">
          {Object.keys(todos).map((compartment) => (
            <button
              key={compartment}
              className={`px-4 py-2 rounded-lg ${activeTab === compartment ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveTab(compartment)}
            >
              {compartment}
            </button>
          ))}
        </div>

        {/* Input for new task */}
        <div className="flex mb-4">
          <input
            type="text"
            className="border rounded-lg p-2 w-full mr-2"
            placeholder={`Add a new ${activeTab} task...`}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>

        {/* Priority and Due Date */}
        <div className="mb-4 flex justify-between">
          <select
            className="border rounded-lg p-2 w-full mr-2"
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          
          <input
            type="date"
            className="border rounded-lg p-2 w-full"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
        </div>

        <button
          onClick={addTodo}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
        >
          Add Task
        </button>

        {/* Task List for Active Tab */}
        <ul className="mt-4">
          {todos[activeTab].length === 0 ? (
            <p className="text-center text-gray-500">No tasks added yet!</p>
          ) : (
            todos[activeTab].map((todo, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-2 mb-2 ${
                  todo.completed ? "line-through text-gray-500" : ""
                } bg-gray-100 rounded-lg`}
              >
                <div>
                  <span
                    className={`cursor-pointer ${
                      todo.completed ? "text-gray-500" : "text-black"
                    }`}
                    onClick={() => toggleComplete(index)}
                  >
                    {todo.text}
                  </span>
                  <div className="text-xs text-gray-500">
                    Priority: {todo.priority}, Due: {todo.dueDate}
                  </div>
                </div>
                <button
                  onClick={() => removeTodo(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
