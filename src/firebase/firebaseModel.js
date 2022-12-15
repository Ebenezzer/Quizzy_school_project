import {createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut, getAuth} from "firebase/auth";
import {initializeApp, database} from "firebase/app";
import {getDatabase, ref, set, get, onChildAdded, onChildRemoved, onValue, child} from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";
import profilePic from "../Assets/Images/profile_pic.png"



// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const REF="quizzy11";


const userEmail = document.getElementById('email')
console.log(auth.currentUser)
//const userId = auth.currentUser.uid;

function signingOut(func){
    signOut(auth).then(() => {
        func()
        console.log("Sign-out successful")
      }).catch((error) => {
        console.log("An error happened", error)
      });
}


function authChange(setUser){
    onAuthStateChanged(auth, setUser)
}

function signIn(email, password, username){ //move the signInACB and createAccountACB to maybe firebaseModel or gameModel so that values such as 
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

function createAccount(email, password, username){
    createUserWithEmailAndPassword(auth, email, password)
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

function observerRecap(model) {
    model.addObserver(observerACB) 
    function observerACB(payload){   
        console.log(payload);    // when notified, update state with current value
        }
}

function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
        if(firebaseData.val() === undefined || Object.keys(firebaseData.val()).length===0){
            return new GameModel()
        }
        function makeGamePromiseCB(gameId){
            return GameModel.getGameDetails(gameId);  // read the game details from firebase
        }
        const GamePromiseArray= Object.keys(firebaseData.val().addGame || []).map(makeGamePromiseCB);

        function createModelACB(game){
            return new GameModel(firebaseData.val().score || 0 , game)
        }
        return Promise.all(GamePromiseArray).then(createModelACB)

    }
    //return onValue(ref(db, REF + userId),(makeBigPromiseACB));
} 


function updateFirebaseFromModel(model){
    model.addObserver(observerACB)

    function observerACB(payload){
        if (payload && payload.userObject){
            set(ref(db, REF+"/users/" + payload.userObject.uid),{
                playerId : null,
                username: null,
                score: null,
                games: [],
                profilePicture: profilePic,
            })
        } //if i call on updatefirebase from model this way, can I then just remove
        //the set function from my signup and login function above

        if (payload && payload.idCurrentGame){
            set(ref(db, REF+"/games/currentGame/"), model.currentGame)
        } 

        if (payload && payload.addedGame){
            set(ref(db, REF+"/games/"+ payload.addedGame.id), {
                gameId: "",
                player1: "",
                player2: "",
                turn: "",
            })
        }

        if (payload && payload.removeGame){
            ref(REF+"/games/"+ payload.removedGame.id).set(null)
        }  //unsure how we would use this removeGame payload, as we want to remove a game id from
        //currentGame path but want the object within that gameid to be available in the database under games

    }
    return model;
}

function updateModelFromFirebase(model) {
    onValue(ref(db, REF+"/users/" + model.currentUser.uid), 
    function playerChangedInFirebaseACB(firebaseData){ model.getPlayerObject(firebaseData.val());})
;

    onValue(ref(db, REF+"/games/currentGame"), 
    function dishChangedInFirebaseACB (firebaseData){ model.setCurrentGame(firebaseData.val());})


    function fetchGameBasedOnID(gameid){
        //return getGameDetails(gameid)
    }

    function addFirebaseGameACB(data){
        function testNoDuplicatesCB(object){ 
            return object.id === +data.key };

        if (!model.games.find(testNoDuplicatesCB)){
            fetchGameBasedOnID(+data.key).then(function addGameACB(game){model.addGame(game)} )
        }
    }

    onChildAdded(ref(db, REF+"/games/"), addFirebaseGameACB)
    
    onChildRemoved(ref(db, REF+"/games/"),
    function removeGameInFirebaseACB (data){ model.removeGame({id: +data.key});} )

    return model;
}

export {app, db, REF, auth, authChange, signIn, signingOut, createAccount, updateModelFromFirebase, 
    observerRecap,firebaseModelPromise, updateFirebaseFromModel}


