import React, { useEffect, useState } from 'react';
import firebase from './firebase';

import Header from './components/Header';
import Todos from './components/Todos';
import NewTodoForm from './components/NewTodoForm';

import './style/App.css';

function App() {
  const [listName, setListName] = useState("Todo List");
  const [todoList, setTodoList] = useState([]);

  const ref = firebase.firestore().collection('users').doc('test');

  const getListName = () => {
    ref.get().then(snapshot => setListName(snapshot.data().listName));
  }

  const getTodoList = () => { 
    ref.collection('todoList').onSnapshot(querySnapshot => {
      const tempTodoList = [];
      querySnapshot.forEach(doc => {
        tempTodoList.push(doc.data());
      });
      
      setTodoList(tempTodoList);
    });
  }

  useEffect(() => {
    getListName();
    getTodoList();
  }, [])

  const newTodo = (title, description, priority, dueDate, notes, completed) => {
    return { title, description, priority, dueDate, notes, completed };
  }
  
  const editListName = newListName => {
    ref.update({listName: newListName});
  }

  const addTodo = (todo) => {
    ref.collection('todoList').add({...todo})
    .then(docRef => ref.collection('todoList').doc(`${docRef.id}`).update({
      id: docRef.id
    }))
    .catch(error => console.error('Error adding new todo', error));
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
