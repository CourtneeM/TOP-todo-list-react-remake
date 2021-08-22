import React, { useEffect, useState } from 'react';
import firebase from './firebase';

import Header from './components/Header';
import Todos from './components/Todos';
import NewTodoForm from './components/NewTodoForm';

import './style/App.css';

function App() {
  const [user, setUser] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [listName, setListName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const ref = firebase.firestore().collection('users');

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
  }

  const getTodoList = () => { 
    ref.doc(`${user.uid}`).collection('todoList').onSnapshot(querySnapshot => {
      const tempTodoList = [];
      querySnapshot.forEach(doc => {
        tempTodoList.push(doc.data());
      });
      
      setTodoList(tempTodoList);
    });
  }

  useEffect(() => {
    if (!user) return;

    const getListName = () => {
      ref.doc(`${user.uid}`).get().then(snapshot => {
        setListName(snapshot.data().listName);
      });
    }

    const uids = [];
    ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        uids.push(doc.id);
      });
    })
    .then(() => {
      if (uids.includes(user.uid)) {
        getListName();
        getTodoList();
      } else {
        ref.doc(`${user.uid}`).set({
          listName: `${firebase.auth().currentUser.displayName}'s List`,
          userName: `${firebase.auth().currentUser.displayName}`
        });
      }
    });

  }, [user]);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(() => {
      setSignedIn(true);
      checkAuthState();
    });
  }

  const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      setSignedIn(false);
    });
  }

  const editListName = newListName => {
    ref.doc(`${user.uid}`).update({listName: newListName});
    setListName(newListName);
  }

  const addTodo = (todo) => {
    ref.doc(`${user.uid}`).collection('todoList').get().then(querySnapshot => {
      querySnapshot.forEach(doc => console.log(doc.data()));
    });
    ref.doc(`${user.uid}`).collection('todoList').add({...todo})
    .then(docRef => ref.doc(`${user.uid}`).collection('todoList').doc(`${docRef.id}`).update({
      id: docRef.id
    }))
    .catch(error => console.error('Error adding new todo', error));
  }

  const editTodo = (title, description, priority, dueDate, notes, completed, id) => {
    ref.doc(`${user.uid}`).collection('todoList').doc(`${id}`).update({
      title, description, priority, dueDate, notes, completed
    })
    .catch(error => console.error('Error editing todo', error));
  }

  const deleteTodo = todoId => {
    ref.doc(`${user.uid}`).collection('todoList').doc(`${todoId}`).delete();
  }

  checkAuthState();

  return (
    <div className="App">
      <Header
        signedIn={signedIn}
        signIn={signIn}
        signOut={signOut}
        listName={listName}
        editListName={editListName}
      />
      {
        signedIn ?
        <>
          <Todos todoList={todoList} editTodo={editTodo} deleteTodo={deleteTodo} />
          <NewTodoForm addTodo={addTodo} />
        </> :
        null
      }
    </div>
  );
}

export default App;
