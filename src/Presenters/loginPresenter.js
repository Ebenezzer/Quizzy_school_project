import loginView from "../Views/loginView/loginView";
import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebaseModel";

function LogIn(){

    const auth = getAuth(app);
    const [email, setEmailACB ] = React.useState("")
    const [password, setPasswordACB] = React.useState("")

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

    return <loginView onCreateAccount = {createAccountACB}/>
}

export default LogIn;
