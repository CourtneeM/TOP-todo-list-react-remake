import React, { useState } from 'react';

const NewTodoForm = props => {
  const [newTodoMode, setNewTodoMode] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);

  const addTodo = () => {
    if (!title || !description || !dueDate || !notes) return;

    props.addTodo(title, description, priority, dueDate, notes, completed);

    setNewTodoMode(false);
    setTitle('');
    setDescription('');
    setPriority(1);
    setDueDate('');
    setNotes('');
    setCompleted(false);
  }

  const cancelAddTodo = () => {
    setNewTodoMode(false);

    setTitle('');
    setDescription('');
    setPriority(1);
    setDueDate('');
    setNotes('');
    setCompleted(false);
  }

  const displayNewTodoForm = () => {
    return (
      <>
        <label id='new-todo-title'>
          Title
          <input type="text" id='new-todo-title' value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label id='new-todo-description'>
          Description
          <input type="text" id='new-todo-description' value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label id='new-todo-priority'>
          Priority
          <select id='new-todo-priority' value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label id='new-todo-due-date'>
          Due Date
          <input type="text" id='new-todo-due-date' value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </label>
        <label id='new-todo-notes'>
          Notes
          <input type="text" id='new-todo-notes' value={notes} onChange={e => setNotes(e.target.value)} />
        </label>
        <label id='new-todo-completed'>
          Completed
          <input type="checkbox" id='new-todo-completed' checked={completed} onChange={e => setCompleted(e.target.checked)} />
        </label>
        <div className='new-todo-controls'>
          <i className="far fa-window-close" onClick={cancelAddTodo} ></i>
          <i className="far fa-check-square" onClick={() => addTodo()}></i>
        </div>
      </>
    );
  }

  const displayNewTodoBtn = () => <i className="fas fa-plus" onClick={() => setNewTodoMode(true)}></i>

  return (
    <div className='new-todo-form'>
      { newTodoMode ? displayNewTodoForm()  : displayNewTodoBtn() }
    </div>
  );
}

export default NewTodoForm;
