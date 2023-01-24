import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyAticRxafQML-01WKwPpWnVI3vZsvqCT7c",
  authDomain: "meuapp-50a2c.firebaseapp.com",
  databaseURL: "https://meuapp-50a2c-default-rtdb.firebaseio.com",
  projectId: "meuapp-50a2c",
  storageBucket: "meuapp-50a2c.appspot.com",
  messagingSenderId: "376278936058",
  appId: "1:376278936058:web:c363271223b42925de1c43",
  measurementId: "G-YGTZNR5N2J"
};

//caso não exista uma base, será iniciada essa do IF, caso já exista não irá iniciar outra
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;