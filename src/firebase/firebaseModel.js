import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, push, update, query, orderByChild, equalTo, limitToLast, off} from "firebase/database";
import firebaseConfig from "./firebaseConfig";


// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const REF = "quizzy11";


function signingOut(func) {
    signOut(auth).then(() => {
        func()
        console.log("Sign-out successful")
    }).catch((error) => {
        console.log("An error happened", error)
    });
    return true;
}


function authChange(setUser) {
    onAuthStateChanged(auth, setUser)
}

function signIn(email, password) {
    setPersistence(auth, browserSessionPersistence).then( ()=> {
    signInWithEmailAndPassword(auth, email, password)
        .then({onlyOnce: true})
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        })
        ;
        return true;
    }
        )
    }

function updateAccount(username) {
    return updateProfile(auth.currentUser, {
        displayName: username
    })
}

function createAccount(email, password, username){
    const userREF = query(ref(db, REF + "/users/publicUsers/"),orderByChild("username"), equalTo(username))
    onValue(userREF, (snapshot) =>{
        if (snapshot.val() === null) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(()=>{
                    updateAccount(username)
                    console.log("created account")
                    set(ref(db, REF + "/users/publicUsers/" + username), {
                        username: username,
                        games: [null],
                        score: 0,
                        profilePictureSrc: "https://cdn-icons-png.flaticon.com/128/4128/4128176.png"
                    })
                }
                )
                .catch((error) => {
                    if (error.code === 'auth/weak-password') {
                        const errorMessage = 'Password should be at least 6 characters';
                        let notify = document.getElementById("errPassword")
                        notify.innerHTML = errorMessage;
                        notify.style.display = "block"
                        setTimeout(()=>{notify.style.display = "none";  
                    }, 3 * 1000)         
                      } else if (error.code === 'auth/email-already-in-use') {
                        const errorMessage = 'An account already exists for that email.';
                        let notify = document.getElementById("errEmail")
                        notify.innerHTML = errorMessage;    
                        notify.style.display = "block"
                        setTimeout(()=>{notify.style.display = "none";  
                    }, 3 * 1000)
                      }
                    //alert(errorMessage)
                });
        }
        else {
            const errorUsername = "This username is already being used!"
            let notify = document.getElementById("errUsername")
            notify.innerHTML = errorUsername;
            notify.style.display = "block"
            setTimeout(()=>{notify.style.display = "none";  
        }, 3 * 1000)       
            console.log(errorUsername)
            //alert(errorUsername)
        }
    },
    {
        onlyOnce: true
      },
    )

    return true;
}

function checkUsernameInviteACB(username){
    return get(ref(db, REF + '/users/publicUsers/' + username)).then((snapshot)=>{
            return snapshot.exists()
    })
}

function getScoresFirebase(model){
    const userScoreREF = query(ref(db, REF + "/users/publicUsers/"), orderByChild("score"), limitToLast(10))
    const playerArray = []
    onValue(userScoreREF, (snapshot) => {
        if (snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
            playerArray.push({username: childSnapshot.key,
                score: childSnapshot.val().score})
            }
        )
        model.setPlayers(playerArray)
        }
        else{
            console.log("No data, leaderboard cannot be rendered")
            off()
        } 
    })
}

function getCurrentOpponent(opponentUsername) {
    function getResultValueACB(result){
        return result.val();
    }
    return get(ref(db, REF + '/users/publicUsers/' + opponentUsername)).then(getResultValueACB);
}

function observerRecap(model) {
    model.addObserver(observerACB)
    function observerACB(payload) {
        console.log(payload);
    }
}

function updateFirebaseFromModel(model) {
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
            model.setGameId(gameId._path.pieces_[2])
        }

        if (payload && payload.currentGame) {
            set(ref(db, REF + "/games/currentGame/"), model.currentGame)
        }

        if (payload && payload.removeGame) {
            ref(REF + "/games/" + payload.removedGame.id).set(null)
        }

        if (payload && payload.winner) {
            update(ref(db, REF + '/games/' + model.currentGame.gameId), { winner: payload.winner })
        }
        if (payload && payload.updatedGame) {
            update(ref(db, REF + '/games/' + model.currentGame.gameId), payload.updatedGame)
        }

    }
    return function () {
        model.removeObserver(observerACB) // save information from the return, and add try catch to check for user
    };
}

function updateModelFromFirebase(model) {

    // subscribe and unsubscribe from observers
    // off() function to remove listeners from firebase that can then be called here: https://firebase.google.com/docs/database/web/read-and-write#detach_listeners

        console.log(model.currentUser.displayName)
        onValue(ref(db, REF + "/users/publicUsers/" + model.currentUser.displayName), (snapshot) => {
            const usernameData= snapshot.val();
            if( model.currentUser){
                // Do something with the snapshot data 
                model.setUser(usernameData)
            }
        }
        )
    
}


function updateGameInfoFromFirebase(model){
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
                console.log("Promise issues")
                console.error(error);
            }); 
        }
        Promise.all(Object.keys(model.user.games).map(getUserGameCB)).then(createModelACB) // rerun every few seconds
    }
}


export {
    app, db, REF, auth, authChange, signIn, signingOut, createAccount, updateAccount, updateModelFromFirebase, getScoresFirebase, 
    observerRecap, updateFirebaseFromModel, updateGameInfoFromFirebase, getCurrentOpponent, checkUsernameInviteACB
}


