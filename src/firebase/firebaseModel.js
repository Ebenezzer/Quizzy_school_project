//import firebase from "firebase/app";

import {initializeApp} from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";

// Initialise firebase
const app = initializeApp(firebaseConfig);  

export default app
