import SignupView from "../Views/signupView/signupView";
import React from "react";
import { auth } from "../firebase/firebaseModel";
import { useNavigate } from 'react-router-dom'
import { createAccount} from "../firebase/firebaseModel";
import { useAuthState } from 'react-firebase-hooks/auth';


function Signup(props){

    const navigate = useNavigate();
    const [email, setEmail ] = React.useState(props.model.email) // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState(props.model.password)
    const [username, setUsername] = React.useState(props.model.username)
    const [loggedin, setLogin] = React.useState(false) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)
    const [user, loading, error] = useAuthState(auth) 
    


    React.useEffect(() => {
        if (loading) {
        console.log("loading")
        return;
        }
        if (user) navigate("/dashboard");
      }, [user, loading]);


    function wasCreatedACB(){           // 1. the component has been created
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
            <SignupView onCreateAccount = {createAccountACB} 
            sendEmail = {setEmailACB} sendPassword = {setPasswordACB} sendUsername = {setUsernameACB}/>
    </div>


}

export default Signup;