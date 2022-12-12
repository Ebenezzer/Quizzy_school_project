import {createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged,signOut} from "firebase/auth";
import {db, REF} from "../firebase/firebaseModel";
import { ref, set } from "firebase/database";
import profilePic from "../Assets/Images/profile_pic.png"


//const auth = getAuth(app)

function signingOut(auth){
    signOut(auth).then(() => {
        console.log("Sign-out successful")
      }).catch((error) => {
        console.log("An error happened")
      });
}

function authChange(auth){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            window.location.hash = "#home";
            console.log("user logged in")
        } else {
            window.location.hash = "#login";
            console.log("user not logged in")
        }
    })
}

function signIn(auth, email, password, username){                    //move the signInACB and createAccountACB to maybe firebaseModel or gameModel so that values such as 
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

    function createAccount(auth, email, password, username){
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

    export {signingOut, signIn, createAccount, authChange}