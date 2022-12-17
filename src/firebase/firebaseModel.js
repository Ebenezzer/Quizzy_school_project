import {createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut, getAuth, updateProfile} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildAdded, onChildRemoved, onValue, child, push, off, update} from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";
import profilePic from "../Assets/Images/profile_pic.png"



// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const REF="quizzy11";


const userEmail = document.getElementById('email')
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

function signIn(email, password){ 
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {  // export
        // Signed in 
        const user = userCredential.user;
        console.log("signed in")
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
        });

        //get(child(ref(db), `users/publicUsers/${username}`))
    }

function updateAccount(username){
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: username
    }).then(() => {
        console.log("completed")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
    });
}

function createAccount(email, password, username){
    createUserWithEmailAndPassword(auth, email, password, username)
        .then((userCredential) => {  // export
            // Signed in 
            const user = userCredential.user;
            console.log("created account")
            set(ref(db, REF+"/users/publicUsers/"+ username), {
                username : username,
                games: [null],
                score: 0,
                profilePicure: profilePic
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
            alert(errorCode)
        });
}

function addGamestoFirebase(user){
    const GameID = push(child(ref(db), 'games')).key;
    push(ref(db, REF+"/games/"), {                
        gameId: GameID,
        player1: user.uid,
        player2: "",
        turn: "",
    })
/*     update(ref(db, REF+"/games/currentGame"), {                
        gameId: GameID,
        player1: user.uid,
        player2: "",
        turn: "",
    }) */
    return GameID;
}

function updateGameFirebase(){
}

function observerRecap(model) {
    model.addObserver(observerACB) 
    function observerACB(payload){   
        console.log(payload);    // when notified, update state with current value
        }
}

function firebaseModelPromise(userId) {
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


function updateFirebaseFromModel(model, userId){
    model.addObserver(observerACB)
    function observerACB(payload){      

        if (payload && payload.score){        
            update(ref(db, REF + '/users/publicUsers/' + model.currentUser.displayName), {score: payload.score})// define payload for updated user object 
        } 

        if (payload && payload.user){        
            set(ref(db, REF+"/users/publicUsers/"+ payload.user.username), payload.user) // define payload for updated user object 
        } 
        
        //make sure to unsubscribe from user after they log out (the same thing from firebase to model ) --> create an acb in firebasemodel
        // to unsubscribe (similar syntax som rad 134)

        if (payload && payload.currentGameObject){
            set(ref(db, REF+"/games/currentGame/"), model.currentGameObject)
        } 

        if (payload && payload.addedGame){
            const GameID = push(child(ref(db), 'games')).key;
            push(ref(db, REF+"/games/"), {                
                gameId: GameID,
                player1: userId.uid,
                player2: "",
                turn: "",
                })
        } 
        // create key values pairs mapping username : uid (not good for security)

        if (payload && payload.removeGame){
            ref(REF+"/games/"+ payload.removedGame.id).set(null)
        }  //unsure how we would use this removeGame payload, as we want to remove a game id from
        //currentGame path but want the object within that gameid to be available in the database under games

    }
    return function (){
        model.removeObserver(observerACB)
    };
}

function updateModelFromFirebase(model) {
    onValue(ref(db, REF+"/users/publicUsers/" + model.currentUser.displayName), 
    function retreivedUsernameACB(firebaseData){model.setUser(firebaseData.val());})

    // onValue(ref(db, REF+"/users/publicUsers" + model.currentUser.uid), 
    // function playerChangedInFirebaseACB(firebaseData){ model.getCurrentPlayerObject(firebaseData.val());})

    // onValue(ref(db, REF+"/users/publicUsers" + model.currentUser.uid),
    // function playerScoreFirebaseACB(firebaseData){ model.currentUser(firebaseData.val())
    // })

    // onValue(ref(db, REF+"/games/currentGame"), 
    // function dishChangedInFirebaseACB (firebaseData){ model.setCurrentGame(firebaseData.val());})


    // function fetchGameBasedOnID(gameid){
    //     //return getGameDetails(gameid)
    // }

    // function addFirebaseGameACB(data){
    //     function testNoDuplicatesCB(object){ 
    //         return object.id === +data.key };

    //     if (!model.games.find(testNoDuplicatesCB)){
    //         fetchGameBasedOnID(+data.key).then(function addGameACB(game){model.addGame(game)} )
    //     }
    // }

    // onChildAdded(ref(db, REF+"/games/"), addFirebaseGameACB)
    
    // onChildRemoved(ref(db, REF+"/games/"),
    // function removeGameInFirebaseACB (data){ model.removeGame({id: +data.key});} )

    return model //unsuscribe here too 
}

export {app, db, REF, auth, authChange, signIn, signingOut, createAccount, updateAccount, updateModelFromFirebase, 
    observerRecap,firebaseModelPromise, updateFirebaseFromModel, addGamestoFirebase, updateGameFirebase }


