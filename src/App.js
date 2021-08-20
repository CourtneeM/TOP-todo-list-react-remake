import React, { useState } from 'react';
import Header from './components/Header';
import Todos from './components/Todos';
import NewTodoForm from './components/NewTodoForm';

import './style/App.css';

function App() {
  const [listName, setListName] = useState("Todo List");
  const [todoList, setTodoList] = useState([]);

  const newTodo = (title, description, priority, dueDate, notes, completed) => {
    return { title, description, priority, dueDate, notes, completed };
  }
  
  const editListName = newListName => {
    setListName(newListName);
  }

  const addTodo = (title, description, priority, dueDate, notes, completed) => {
    const todoListCopy = [...todoList];
    todoListCopy.push(newTodo(title, description, priority, dueDate, notes, completed));

    setTodoList(todoListCopy);
  }

  const editTodo = (title, description, priority, dueDate, notes, completed, index) => {
    const todoListCopy = [...todoList];
    todoListCopy.splice(index, 1, newTodo(title, description, priority, dueDate, notes, completed));

    setTodoList(todoListCopy);
  }

  const deleteTodo = index => {
    const todoListCopy = [...todoList];
    todoListCopy.splice(index, 1);

    setTodoList(todoListCopy);
  }

  return (
    <div className="App">
      <Header listName={listName} editListName={editListName} />
      <Todos todoList={todoList} editTodo={editTodo} deleteTodo={deleteTodo} />
      <NewTodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
