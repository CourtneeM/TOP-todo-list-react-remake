import React from 'react';
import Todo from './Todo';

const Todos = ({ todoList, editTodo, deleteTodo }) => {
  return (
    <div className='todos-container'>
      {
        todoList.map((todo, i) => {
          return <Todo key={i} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} index={i} />
        })
      }
    </div>
  );
}

export default Todos;
