import {createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut, getAuth} from "firebase/auth";
import {initializeApp, database} from "firebase/app";
import {getDatabase, ref, set, get, onChildAdded, onChildRemoved, onValue, child} from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";
import profilePic from "../Assets/Images/profile_pic.png"

//import firebase from "firebase/compat/app";
//import "firebase/database";


// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const REF="quizzy11";


const userEmail = document.getElementById('email')
const userId = auth.currentUser.uid;

function signingOut(authen){
    signOut(authen).then(() => {
        console.log("Sign-out successful")
      }).catch((error) => {
        console.log("An error happened")
      });
}

function authChange(authen){
    onAuthStateChanged(authen, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("uid", uid)
            console.log("user logged in")
        } else {
            console.log("user not logged in")
        }
    })
}

function signIn(authen, email, password, username){ //move the signInACB and createAccountACB to maybe firebaseModel or gameModel so that values such as 
                                             //email,password & user credentials are accessible to other parts of the program
    signInWithEmailAndPassword(authen, email, password)
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
    createUserWithEmailAndPassword(email, password)
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
    return onValue(ref(db, REF + userId),(makeBigPromiseACB));
} 


function updateFirebaseFromModel(model){
    model.addObserver(observerACB)

    function observerACB(payload){
        if (payload && payload.playerId){
            set(ref(db, REF+"users/" + userEmail.target.value),{
                playerId : null,
                username: null,
                score: null,
                games: [],
                profilePicture: profilePic,
            })
        } 

        if (payload && payload.idCurrentGame){
            ref(REF+"/currentGame").set(model.currentGame)
        } 

        if (payload && payload.addedGame){
            console.log(REF+"/addGame/"+ payload.addedDish.id)
            ref(REF+"/addGame/"+ payload.addedGame.id).set("gameId")
        }

        if (payload && payload.removeGame){
            ref(REF+"/addGame/"+ payload.removedGame.id).set(null)
        }

        if (payload && payload.score){
            ref(REF+ "/score/" + payload.playerId.id).set(model.score)
        }

    }
    return model;
}

function updateModelFromFirebase(model) {
    onValue(ref(db, REF+"/player"), 
    function playerChangedInFirebaseACB(firebaseData){ model.getPlayerObject(firebaseData.val());})
;

    onValue(ref(db, REF+"/currentGame"), 
    function dishChangedInFirebaseACB (firebaseData){ model.setCurrentGame(firebaseData.val());})


    function fetchGameBasedOnID(gameid){
        //return getGameDetails(gameid)
    }

    function addFirebaseDishACB(data){
        function testNoDuplicatesCB(object){ 
            return object.id === +data.key };

        if (!model.games.find(testNoDuplicatesCB)){
            fetchGameBasedOnID(+data.key).then(function addGameACB(game){model.addGame(game)} )
        }
    }

    onChildAdded(ref(db, REF+"/addGame/"), addFirebaseDishACB)
    
    onChildRemoved(ref(db, REF+"/addGame/"),
    function removeGameInFirebaseACB (data){ model.removeGame({id: +data.key});} )

    onValue(ref(db, REF+"/player"), 
    function changeScoreFirebaseAC(firebaseData){model.setPlayerScore(firebaseData.val());})

    return model;
}

export {app, db, REF, auth, authChange, signIn, signingOut, createAccount, updateModelFromFirebase, 
    observerRecap,firebaseModelPromise, updateFirebaseFromModel}


