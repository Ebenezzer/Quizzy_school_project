import LoginView from "../Views/loginView/loginView";
import React from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebaseModel";

function LogIn(){

    const auth = getAuth(app);
    const [email, setEmail ] = React.useState("")
    const [password, setPassword] = React.useState("")

    function signInACB(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }

    function createAccountACB(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
         console.log(user);
        alert("Account created")
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
        // ..
        });
    }

    return <LoginView onCreateAccount = {createAccountACB} onLogin = {signInACB}/>
}

export default LogIn;
