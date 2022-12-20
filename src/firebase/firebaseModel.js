import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, push, off, update, query, orderByChild, equalTo } from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";


// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const REF = "quizzy11";

const userEmail = document.getElementById('email')

function signingOut(func) {
    signOut(auth).then(() => {
        func()
        console.log("Sign-out successful")
    }).catch((error) => {
        console.log("An error happened", error)
    });
}


function authChange(setUser) {
    onAuthStateChanged(auth, setUser)
}

function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {  // export
        // Signed in 
        const user = userCredential.user;
        console.log("signed in")
        // ...
        },    
        {
            onlyOnce: true
          })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        alert(errorCode)
        })
        ;

        //get(child(ref(db), `users/publicUsers/${username}`))
    }

function updateAccount(username) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: username
    }).then(() => {
        console.log("completed")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert(errorCode)
    });
}

function createAccount(email, password, username){
    const userREF = query(ref(db, REF + "/users/publicUsers/"),orderByChild("username"), equalTo(username))
    onValue(userREF, (snapshot) =>{
        if (snapshot.val() === null) {
            createUserWithEmailAndPassword(auth, email, password, username)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("created account")
                    set(ref(db, REF + "/users/publicUsers/" + username), {
                        username: username,
                        games: [null],
                        score: 0,
                        profilePictureSrc: "https://cdn-icons-png.flaticon.com/128/4128/4128176.png"
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    alert(errorCode)
                });
        }
        else {
            const errorUsername = "This username is already being used!"
            console.log(errorUsername)
            alert(errorUsername)
        }
    },
    {
        onlyOnce: true
      }
    )

}

function updateGameFirebase() {
}

function getCurrentOpponent(model, opponentUsername) {
    get(ref(db, REF + '/users/publicUsers/' + opponentUsername)).then((snapshot) => {
        if (snapshot.exists()) {
            model.setCurrentOpponent(snapshot.val())
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function observerRecap(model) {
    model.addObserver(observerACB)
    function observerACB(payload) {
        console.log(payload);
    }
}

function firebaseModelPromise(userId) {
    function makeBigPromiseACB(firebaseData) {
        if (firebaseData.val() === undefined || Object.keys(firebaseData.val()).length === 0) {
            return new GameModel()
        }
        function makeGamePromiseCB(gameId) {
            return GameModel.getGameDetails(gameId);
        }
        const GamePromiseArray = Object.keys(firebaseData.val().addGame || []).map(makeGamePromiseCB);

        function createModelACB(game) {
            return new GameModel(firebaseData.val().score || 0, game)
        }
        return Promise.all(GamePromiseArray).then(createModelACB)

    }
}


function updateFirebaseFromModel(model, userId) {
    model.addObserver(observerACB)
    function observerACB(payload) {

        if (payload && payload.score) {
            update(ref(db, REF + '/users/publicUsers/' + model.currentUser.displayName), { score: payload.score })
        }

        if (payload && payload.user) {
            set(ref(db, REF + "/users/publicUsers/" + payload.user.username), payload.user)
        }

        if (payload && payload.newGame) {
            const gameId = push(ref(db, REF + '/games'), payload.newGame)
            set(ref(db, REF + "/users/publicUsers/" + payload.newGame.player1 + '/games/' + gameId._path.pieces_[2]), gameId._path.pieces_[2])
            set(ref(db, REF + "/users/publicUsers/" + payload.newGame.player2 + '/games/' + gameId._path.pieces_[2]), gameId._path.pieces_[2])
            model.setCurrentGame(payload.newGame)
            model.setCurrentGameId(gameId._path.pieces_[2])
        }

        //make sure to unsubscribe from user after they log out (the same thing from firebase to model ) --> create an acb in firebasemodel
        // to unsubscribe (similar syntax som rad 134)

        if (payload && payload.currentGame) {
            set(ref(db, REF + "/games/currentGame/"), model.currentGame)
        }
        // create key values pairs mapping username : uid (not good for security)

        if (payload && payload.removeGame) {
            ref(REF + "/games/" + payload.removedGame.id).set(null)
        }  //unsure how we would use this removeGame payload, as we want to remove a game id from
        //currentGame path but want the object within that gameid to be available in the database under games

        if (payload && payload.winner) {
            update(ref(db, REF + '/games/' + model.currentGame.gameId), { winner: payload.winner })
        }
        if (payload && payload.updatedGame) {
            update(ref(db, REF + '/games/' + model.currentGameId), payload.updatedGame)
        }

    }
    return function () {
        model.removeObserver(observerACB) // save information from the return, and add try catch to check for user
    };
}

function updateModelFromFirebase(model) {
    // subscribe and unsubscribe from observers
    // off() function to remove listeners from firebase that can then be called here

    if (model.currentUser) {

        onValue(ref(db, REF + "/users/publicUsers/" + model.currentUser.displayName),
            function retreivedUsernameACB(firebaseData) {
                model.setUser(firebaseData.val());})}} // unsub

function updateGameInfo(model){
 if (model.user.games){
function createModelACB(game) {
    model.setGameInfo(game)
}

function getUserGameCB(gameID) {
    return get(ref(db, REF + '/games/' + gameID)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    }); 
}
Promise.all(Object.keys(model.user.games).map(getUserGameCB)).then(createModelACB) // rerun every few seconds
 }
}

// update model.user.games i modellen and make sure that you can render


export {
    app, db, REF, auth, authChange, signIn, signingOut, createAccount, updateAccount, updateModelFromFirebase,
    observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateGameFirebase, getCurrentOpponent, updateGameInfo
}


