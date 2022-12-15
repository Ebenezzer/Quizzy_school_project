import { getQuestions } from "./questionSource";
import resolvePromise from "./resolvePromise";
import { authChange } from "./firebase/firebaseModel";



class GameModel{
    constructor(gameArray=[]){
        this.user = {}
        this.currentGame = {}
        this.observers=[];
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
        this.questionsPromiseState = {};
        this.roundArray = [];
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
                console.log("user", user)
                this.notifyObservers({userObject : user })
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

    addGame(gameToAdd){
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

    setCurrentGame(gameId){
        function notifyACB(){    
            this.notifyObservers();
            }
        if (this.currentGameId!==gameId){
            if (gameId){
                this.currentGameId=gameId
                this.notifyObservers({idCurrentGame: gameId})
                return resolvePromise(this.getGameDetails(gameId),this.currentGamePromiseState, notifyACB.bind(this));
            }
        }
    }

    setCurrentPlayer(playerId){
        //TODO this.currentPlayerId
    }

    getPlayerObject(playerId){
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
}

export default GameModel;

