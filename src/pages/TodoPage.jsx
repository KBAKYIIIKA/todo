import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = () => {

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
      
    } else if (filter === 'incomplete') {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  const navigate = useNavigate();
  const goToToDoColumns = () => {
      navigate('/dnd');
    };

  return (
    <div>
      <h1>My To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <label>
          <input 
            type="radio" 
            value="all" 
            checked={filter === 'all'} 
            onChange={handleFilterChange} 
          />
          All
        </label>
        <label>
          <input 
            type="radio" 
            value="completed" 
            checked={filter === 'completed'} 
            onChange={handleFilterChange} 
          />
          Completed
        </label>
        <label>
          <input 
            type="radio" 
            value="incomplete" 
            checked={filter === 'incomplete'} 
            onChange={handleFilterChange} 
          />
          Uncompleted
        </label>
      </div>

      <TodoList todos={filteredTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>

      <button onClick={goToToDoColumns}
                style = {{
                    marginTop: '20px',
                    height :'50px',
                }}
                >
                Go to ToDoColumns
      </button>
    </div>
  );
}

export default App;