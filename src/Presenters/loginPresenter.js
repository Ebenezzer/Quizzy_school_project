import LoginView from "../Views/loginView/loginView";
import React from "react";
import { auth } from "../firebase/firebaseModel";
import { NavLink, useNavigate } from 'react-router-dom'
import { createAccount, signIn } from "../firebase/firebaseModel";
import { useAuthState } from 'react-firebase-hooks/auth';


function LogIn(props){

    const navigate = useNavigate();
    const [email, setEmail ] = React.useState(props.model.email) // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState(props.model.password)
    const [username, setUsername] = React.useState(props.model.username)
    const [loggedin, setLogin] = React.useState(false) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)

    function wasCreatedACB(){                            // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 
    
    function observerACB(){   
        setEmail(props.model.email);    // when notified, update state with current value
        setPassword(props.model.password);
        setUsername(props.model.username)
        }

    function createAccountACB(){
        createAccount(auth, email, password, username)
        navigate("/home")
    }

    function signInACB(){
        signIn(auth, email, password, username)
        navigate("/home")
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
            <LoginView onCreateAccount = {createAccountACB} onLogin = {signInACB} 
            sendEmail = {setEmailACB} sendPassword = {setPasswordACB} sendUsername = {setUsernameACB}/>
    </div>
}
// observer function to check if an user is signed out or logged in before showcasing the page

export default LogIn;
