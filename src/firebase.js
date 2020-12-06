import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  const firebaseConfig = {
    apiKey: "AIzaSyAZDTbOvzOHsUEKnwTdQStl5K72vnMpi6M",
    authDomain: "reactappprova.firebaseapp.com",
    databaseURL: "https://reactappprova.firebaseio.com",
    projectId: "reactappprova",
    storageBucket: "reactappprova.appspot.com",
    messagingSenderId: "875459731480",
    appId: "1:875459731480:web:615f8e6e30d9246e8a236d"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;