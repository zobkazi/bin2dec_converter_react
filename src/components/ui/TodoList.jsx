import PropTypes from "prop-types";

const TodoList = ({ todos, toggleComplete, removeTodo }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Task List</h1>
      <ul className="mt-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks added yet!</p>
        ) : (
          todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 mb-2 ${
                todo.completed ? "line-through text-gray-500" : ""
              } bg-purple-400 rounded-lg`}
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
                  Category: {todo.category}, Priority: {todo.priority}, Due:{" "}
                  {todo.dueDate}
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
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
