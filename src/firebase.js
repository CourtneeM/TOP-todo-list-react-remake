import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUt-vQZmEbXlHyGmN-2UvKRB8j0SY_lrk",
  authDomain: "top-todo-list.firebaseapp.com",
  projectId: "top-todo-list",
  storageBucket: "top-todo-list.appspot.com",
  messagingSenderId: "127428160179",
  appId: "1:127428160179:web:d623ad082be4eb71f25ec6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
