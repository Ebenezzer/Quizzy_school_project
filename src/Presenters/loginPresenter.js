import LoginView from "../Views/loginView/loginView";
import React from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from "firebase/auth";
import {app,db, REF} from "../firebase/firebaseModel";
import {ref, set} from "firebase/database";
import profilePic from "../Assets/Images/profile_pic.png"



function LogIn(){

    const auth = getAuth(app)
    const [email, setEmail ] = React.useState("") // definiera email och password i modelen/application state för att kunna ändra det här
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [loggedin, setLogin] = React.useState("") // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)

    function checkAuth(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                window.location.hash = "#home";
            } else {
                window.location.hash = "#login";
            }
        })
    }

    function signOut(){
        signOut(auth).then(() => {
            console.log("Sign-out successful")
          }).catch((error) => {
            console.log("An error happened")
          });
    }
    function signInACB(){                    //move the signInACB and createAccountACB to maybe firebaseModel or gameModel so that values such as 
                                             //email,password & user credentials are accessible to other parts of the program
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {  // export
        // Signed in 
        const user = userCredential.user;
            set(ref(db, REF+ "/users/"+ user.uid),{
                playerId : null,
                username: username,
                score: null,
                games: ["game1", "game2"],
                profilePicture: profilePic,
            })
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

    function setUsernameACB(usernameInput){
        setUsername(usernameInput)
    }

    function createAccountACB(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        set(ref(db, REF+ "/users/"+ user.uid),{
            playerId : null,
            username: username,
            score: null,
            games: ["game1", "game2"],
            profilePicture: profilePic,
        })
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

        set(ref(db, REF+ "/users/"+ username),{
            playerId : null,
            username: null,
            score: null,
            games: ["game1", "game2"],
            profilePicture: profilePic,
        })
    }

    return <LoginView onCreateAccount = {createAccountACB} onLogin = {signInACB} 
    sendEmail = {setEmailACB} sendPassword = {setPasswordACB} sendUsername = {setUsernameACB}/>
}
// observer function to check if an user is signed out or logged in before showcasing the page

export default LogIn;
