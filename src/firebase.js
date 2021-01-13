import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZDTbOvzOHsUEKnwTdQStl5K72vnMpi6M",
  authDomain: "reactappprova.firebaseapp.com",
  databaseURL: "https://reactappprova.firebaseio.com",
  projectId: "reactappprova",
  storageBucket: "reactappprova.appspot.com",
  messagingSenderId: "875459731480",
  appId: "1:875459731480:web:615f8e6e30d9246e8a236d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export function initDB(id) {
  firebase
    .database()
    .ref(id + "/cash")
    .set({
      checked: false,
      saldo: 0,
    });

  firebase
    .database()
    .ref(id + "/bancomat")
    .set({
      checked: false,
      saldo: 0,
    });

  firebase
    .database()
    .ref(id + "/prepagata")
    .set({
      checked: false,
      saldo: 0,
    });

  firebase
    .database()
    .ref(id + "/buonipasto")
    .set({
      checked: false,
      saldo: 0,
      quantity: 0,
    });
}

export function getUserFromDb() {
  var userIDref = firebase.database().ref("users/");
  userIDref.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

export default firebase;
