import { getQuestions } from "./questionSource";
import resolvePromise from "./resolvePromise";
import { authChange } from "./firebase/firebaseModel";
import { updateFirebaseFromModel, updateModelFromFirebase } from "./firebase/firebaseModel";



class GameModel{
    constructor(gameArray=[]){
        this.user = {}  //samma som currentPlayerObject ?
        this.currentGame = {}
        this.observers=[];
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
        this.questionsPromiseState = {};
        this.currentUser = undefined // to save data from firebase into
        this.currentGame = {}
        this.addAuthObserver()
        //if you want to reach email, username etc.. user currentuser object, only if user is actually logged in 
    }
    
    addObserver(addObserverCB){
        this.observers = [...this.observers, addObserverCB]
    }

    removeObserver(observerToRemove){
        function removeObserverCB(observer){
            return observerToRemove !== observer;
        }
        this.observers = [...this.observers].filter(removeObserverCB)
    }
    
    addAuthObserver(){
        function authUserACB(user){
            this.currentUser = user;
            updateFirebaseFromModel(this)
            updateModelFromFirebase(this)
            console.log("user", user)
            this.notifyObservers({})
        }
        authChange(authUserACB.bind(this))
    }

    notifyObservers(payload){
        try {
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);})
          }
        catch(err) {
            console.error(err)
          }
    }

    addGame(gameToAdd){ //to add game to game array and not firebase
        function testNoDuplicatesCB(object){ return object.gameId !== gameToAdd.gameId; };

        function testDuplicatesCB(obj){ return obj.gameId === gameToAdd.gameId; };
        
        if(this.games.filter(testDuplicatesCB).length===0){
            this.games = [...this.games.filter(testNoDuplicatesCB), gameToAdd];
            this.notifyObservers({addedGame: gameToAdd});
        }
    }
    
    removeGame(gameToRemove){
        function isNotInGamesCB(obj){ 
            return gameToRemove.gameId !== obj.gameId};

        function isInGamesCB(obj)
        { return gameToRemove.gameId === obj.gameId}; 

        if(this.games.find(isInGamesCB) !== undefined){
            this.games = this.games.filter(isNotInGamesCB) 
            this.notifyObservers({removedGame: gameToRemove});
        }
    }

    getGameDetails(gameId) {
        //TODO get game object from firebase
    }

    setCurrentGame(gameObject){
        function notifyACB(){    
            this.notifyObservers();
            }
        if (this.currentGame!==gameObject){
            if (gameObject){
                this.currentGame=gameObject
                this.notifyObservers({currentGame: gameObject})
                return resolvePromise(this.getGameDetails(gameObject),this.currentGamePromiseState, notifyACB.bind(this));
            }
        }
    }

    updateScore(){
        this.user.score ++;
        console.log(this.user)
        this.notifyObservers({score: this.user.score});
    }

    setUser(user){// call on login or create account
        this.user = user
        this.notifyObservers({user: this.user})
    }

    setCurrentPlayer(playerId){
        //TODO this.currentPlayerId
    }

    getPlayerCurrentObject(playerObject){
        this.currentPlayerObject = playerObject;
    // TODO get player information from Firebase
    }

    getNewQuestions(category){
        function notifyACB(){
            this.notifyObservers();
        }
        resolvePromise(getQuestions({limit: 3, categories: category}), this.questionsPromiseState, notifyACB.bind(this));
    }

    updateRoundArray(roundArray){
        this.roundArray = roundArray;
    }

    /*getOpponentId(){
        return getGameDetails(this.currentGameId).player1 != props.model.currentPlayerId ? 
            getGameDetails(this.currentGameId).player1 :
            getGameDetails(this.currentGameId).player2;
    }*/
    setPlayerObject(){
    }
    setWinner(){
        function getWinner(){
            return 
        }
        //this.currentGameObject.winner = getWinner();
        //this.notifyObservers({winner: winner});  // payload?
    }
}

export default GameModel;

