import React, { useEffect, useState } from 'react';

const Todo = ({ todo, editTodo, deleteTodo, index }) => {
  const [editTodoMode, setEditTodoMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [notes, setNotes] = useState(todo.notes);
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setEditTodoMode(false);

    setTitle(todo.title);
    setDescription(todo.description);
    setPriority(todo.priority);
    setDueDate(todo.dueDate);
    setNotes(todo.notes);
    setCompleted(todo.completed);
  }, [todo]);

  const confirmEditTodo = () => {
    if (!title || !description || !dueDate || !notes) return;

    editTodo(title, description, priority, dueDate, notes, completed, index);

    setEditTodoMode(false);
  }

  const cancelEditTodo = () => {
    setEditTodoMode(false);

    setTitle(todo.title);
    setDescription(todo.description);
    setPriority(todo.priority);
    setDueDate(todo.dueDate);
    setNotes(todo.notes);
    setCompleted(todo.completed);
  }

  const displayEditTodo = () => {
    return (
      <>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Title</p>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Description</p>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Priorty</p>
          <select value={priority} onChange={e => setPriority(e.target.value)} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Due Date</p>
          <input type="text" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </div>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Notes</p>
          <input type="text" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Completed</p>
          <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
        </div>
        <div className='todo-controls'>
          <i className="far fa-trash-alt" onClick={() => deleteTodo(index)}></i>
          <i className="far fa-window-close" onClick={cancelEditTodo} ></i>
          <i className="far fa-check-square" onClick={confirmEditTodo}></i>
        </div>
      </>
    );
  }

  const displayTodo = () => {
    return (
      <>
        <div className='todo-item-section'>
          <p className='todo-item-header'>Title</p>
          <p className='todo-item-value'>{todo.title}</p>
        </div>
    
        <div className='todo-item-section'>
          <p className='todo-item-header'>Description</p>
          <p className='todo-item-value'>{todo.description}</p>
        </div>
    
        <div className='todo-item-section'>
          <p className='todo-item-header'>Priority</p>
          <p className='todo-item-value'>{todo.priority}</p>
        </div>
    
        <div className='todo-item-section'>
          <p className='todo-item-header'>Due Date</p>
          <p className='todo-item-value'>{todo.dueDate}</p>
        </div>
    
        <div className='todo-item-section'>
          <p className='todo-item-header'>Notes</p>
          <p className='todo-item-value'>{todo.notes}</p>
        </div>
    
        <div className='todo-item-section'>
          <p className='todo-item-header'>Completed</p>
          <p className='todo-item-value'>{todo.completed ? 'True' : 'False'}</p>
        </div>
        <i className="fas fa-edit" onClick={() => setEditTodoMode(true)}></i>
      </>
    );
  }

  return (
    <div className='todo-item'>
      { editTodoMode ? displayEditTodo() : displayTodo() }
    </div>
  );
}

export default Todo;
