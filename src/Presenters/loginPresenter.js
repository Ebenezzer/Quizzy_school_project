import LoginView from "../Views/loginView/loginView";
import React from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {app} from "../firebase/firebaseModel";

function LogIn(){

    const auth = getAuth(app)
    const [email, setEmail ] = React.useState("") // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState("")

    function signInACB(){                    //move the signInACB and createAccountACB to maybe firebaseModel or gameModel so that values such as 
                                             //email,password & user credentials are accessible to other parts of the program
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("Signed in")
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
        });
    }

    function setEmailACB(emailInput){ //functionn created by me in order to keep track of the custom event
        setEmail(emailInput)
    }

    function setPasswordACB(passwordInput){
        setPassword(passwordInput)
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

    return <LoginView onCreateAccount = {createAccountACB} onLogin = {signInACB} 
    sendEmail = {setEmailACB} sendPassword = {setPasswordACB}/>
}
// observer function to check if an user is signed out or logged in before showcasing the page

export default LogIn;
