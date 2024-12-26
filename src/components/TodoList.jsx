import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo }) {

    const handleDelete = (id) => {
        deleteTodo(id);
      };

    return (
        <div>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} onDelete={handleDelete}/>
            ))}
        </div>
    );
}
export default TodoList;