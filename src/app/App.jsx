import { useState } from "react";
import { Route, Link,  } from 'wouter';
import About from '../pages/About'
import Home from '../pages/Home'
import Todos from '../pages/Todos'
import TodoForm from "../pages/todo/Add";
import TodoList from "../pages/Todos";


const App = () => {

  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };


  return (
    <div className=''>

      <nav className='flex text-4xl gap-2 justify-center items-center'>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/todo">Todos</Link>
      </nav>
      <Route path="/" component={Home} />
       <Route path="/about" component={About} />
       <Route path="/todo" component={Todos} />

       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <nav className="mb-4">
        <Link to="/add" className="text-blue-500">Add Todo</Link>
        <Link to="/" className="text-blue-500 ml-4">Todo List</Link>
      </nav>

      <Route path="/add">
        <TodoForm addTodo={addTodo} />
      </Route>
      <Route path="/">
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
      </Route>
    </div>
  
     
    </div>
  )
}

export default App