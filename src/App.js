import React, { useEffect, useState } from 'react';
import firebase from './firebase';

import Header from './components/Header';
import Todos from './components/Todos';
import NewTodoForm from './components/NewTodoForm';

import './style/App.css';

function App() {
  const [listName, setListName] = useState("");
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

  const editListName = newListName => {
    ref.update({listName: newListName});
    getListName();
  }

  const addTodo = (todo) => {
    ref.collection('todoList').add({...todo})
    .then(docRef => ref.collection('todoList').doc(`${docRef.id}`).update({
      id: docRef.id
    }))
    .catch(error => console.error('Error adding new todo', error));
  }

  const editTodo = (title, description, priority, dueDate, notes, completed, id) => {
    ref.collection('todoList').doc(`${id}`).update({
      title, description, priority, dueDate, notes, completed
    })
    .catch(error => console.error('Error editing todo', error));
  }

  const deleteTodo = todoId => {
    ref.collection('todoList').doc(`${todoId}`).delete();
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
