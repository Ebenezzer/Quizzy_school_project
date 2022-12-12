import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";
import firebase from "firebase/compat/app";
import "firebase/database";
import profilePic from "../Assets/Images/profile_pic.png"



// Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const REF="quizzy11";
const userEmail = document.getElementById('email')


/* function writeData(userId, name, email){
    const db = getDatabase(app);
    const reference = ref(db, "users/" + userId)

set(reference,{
    username: name,
    email: email
});

}

writeData("twossielola", "lola", "lola@gmail.com") */



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
    return ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
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

export {app,db, REF, firebaseModelPromise, updateFirebaseFromModel}


