import LoginView from "../Views/loginView/loginView";
import React from "react";
import { getAuth} from "firebase/auth";
import {app,db, REF} from "../firebase/firebaseModel";
import { createAccount, signIn, signingOut } from "../firebase/firebaseAuthentication";


import Show from "../components/show/show";

function LogIn(){

    const auth = getAuth(app)
    const [email, setEmail ] = React.useState("") // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [loggedin, setLogin] = React.useState("") // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)

    function createAccountACB(){
        createAccount(auth, email, password, username)
    }

    function signInACB(){
        signIn(auth, email, password, username)
    }

    function setEmailACB(emailInput){ //functionn created by me in order to keep track of the custom event
        setEmail(emailInput)
    }

    function setPasswordACB(passwordInput){
        setPassword(passwordInput)
    }

    function setUsernameACB(usernameInput){
        setUsername(usernameInput)
    }

    return <div>
        <Show hash="#login">
            <LoginView onCreateAccount = {createAccountACB} onLogin = {signInACB} 
            sendEmail = {setEmailACB} sendPassword = {setPasswordACB} sendUsername = {setUsernameACB}/>
        </Show>
    </div>
}
// observer function to check if an user is signed out or logged in before showcasing the page

export default LogIn;
