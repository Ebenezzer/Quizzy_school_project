import LoginView from "../Views/loginView/loginView";
import React from "react";
import { useNavigate } from 'react-router-dom'
import { signIn } from "../firebase/firebaseModel";


function LogIn(props){

    const navigate = useNavigate();
    const [email, setEmail ] = React.useState(props.model.email) 
    const [password, setPassword] = React.useState(props.model.password)
    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser)

     React.useEffect(() => {
         if (userLoggedIn) navigate("/home");
       }, [userLoggedIn]);


    function wasCreatedACB(){ 
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        }; 
    }
    React.useEffect(wasCreatedACB, []); 

    function observerACB(){   
        setEmail(props.model.email);    
        setPassword(props.model.password);
        setUserLogin(props.model.currentUser)
        }

    function signInACB(){
        signIn(email, password)
    }

    function setEmailACB(emailInput){
        setEmail(emailInput)
    }

    function setPasswordACB(passwordInput){
        setPassword(passwordInput)
    }

    return <div>
            <LoginView onLogin = {signInACB} 
            sendEmail = {setEmailACB} sendPassword = {setPasswordACB}/>
    </div>
}

export default LogIn;
