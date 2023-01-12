import SignupView from "../Views/signupView/signupView";
import React from "react";
import { useNavigate } from 'react-router-dom'
import { createAccount, updateAccount} from "../firebase/firebaseModel";
import profilePic from "../Assets/Images/woman.png"



function Signup(props){

    const navigate = useNavigate();
    const [email, setEmail ] = React.useState() // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState()
    const [username, setUsername] = React.useState()
    const [userSignedIn, setUserSignup] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)

    React.useEffect(() => {
        if (userSignedIn) {
            navigate("/home")
        }
      }, [userSignedIn]);
    
    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 
    
    function observerACB(){   
        setUserSignup(props.model.currentUser)
        }

    function createAccountACB(){
        createAccount(email, password, username)
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