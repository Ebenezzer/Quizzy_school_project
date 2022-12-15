import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import GameModel from "../GameModel";
import firebase from "firebase/compat/app";


// Initialise firebase
const app = initializeApp(firebaseConfig);
//const database = getDatabase();
//const auth = firebase.getAuth(app);

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

 function updateFirebaseFromModel(model){
    model.addObserver(observerACB)

    function observerACB(payload){
        if (payload && payload.playerId){
            firebase.database().ref(REF+"/player").set(model.player)
        } 

        if (payload && payload.idCurrentGame){
            firebase.database().ref(REF+"/currentGame").set(model.currentGame)
        } 

        if (payload && payload.addedGame){
            console.log(REF+"/addGame/"+ payload.addedDish.id)
            firebase.database().ref(REF+"/addGame/"+ payload.addedGame.id).set("gameId")
        }

        if (payload && payload.removeGame){
            firebase.database().ref(REF+"/addGame/"+ payload.removedGame.id).set(null)
        }

        if (payload && payload.score){
            firebase.database().ref(REF+ "/score/" + payload.playerId.id).set(model.score)
        }

    }
    return model;
}


function updateModelFromFirebase(model) {
    firebase.database().ref(REF+"/player").on("value", 
    function playerChangedInFirebaseACB(firebaseData){ model.getPlayerObject(firebaseData.val());}
    );

    firebase.database().ref(REF+"/currentGame").on("value", 
    function dishChangedInFirebaseACB (firebaseData){ model.setCurrentGame(firebaseData.val());}
    );

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

     firebase.database().ref(REF+"/addGame/").on("game_added", addFirebaseDishACB);

     firebase.database().ref(REF+"/addGame/").on("game_removed", 
     function removeGameInFirebaseACB (data){ model.removeGame({id: +data.key});}
     );

    firebase.database().ref(REF+"/player").on("value",
    function changeScoreFirebaseAC(firebaseData){model.setPlayerScore(firebaseData.val());}
    );
    return model;
}

export {app, observerRecap, firebaseModelPromise, updateFirebaseFromModel,updateModelFromFirebase}
