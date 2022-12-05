import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";


// Initialise firebase
firebase.initializeApp(firebaseConfig);


const REF = "quizzy11"

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
    return firebase.database().ref(REF /* <-- note! Whole object! */).once("value").then(makeBigPromiseACB);
}


/* function updateFirebaseFromModel(model){
    model.addObserver(observerACB)

    function observerACB(payload){
        if (payload && payload.setNumber){
            firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests)
        } 

        if (payload && payload.idCurrentDish){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish)
        } 

        if (payload && payload.addedDish){
            console.log(REF+"/addToMenu/"+ payload.addedDish.id)
            firebase.database().ref(REF+"/addToMenu/"+ payload.addedDish.id).set("dishName")
        }

        if (payload && payload.removedDish){
            firebase.database().ref(REF+"/addToMenu/"+ payload.removedDish.id).set(null)
        }
    }
    return model;
} */


export {observerRecap, firebaseModelPromise}
