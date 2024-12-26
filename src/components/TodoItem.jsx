import React from 'react';

function TodoItem({ todo, toggleTodo, onDelete }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}y
            />
            <span>{todo.title}</span>
            <button onClick={() => onDelete(todo.id)}>Del</button>
        </div>
    );
}
export default TodoItem;