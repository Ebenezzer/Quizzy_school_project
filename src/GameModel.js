import resolvePromise from "./resolvePromise";
import { signIn, createAccount } from "./firebase/firebaseModel";



class GameModel{
    constructor(gameArray=[]){
        this.observers=[];
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
        this.email = "";
        this.password = "";
        this.username = "";
        this.currentUser = {} // to save data from firebase into
        this.currentGame = {}
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

    createAccountMo(auth, email, password, username){
        createAccount(auth, email, password)

    }

    signInMo(auth, email, password, username){ 
        signIn(auth, email, password)
    }

    notifyObservers(payload){
        try {
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);})
          }
        catch(err) {
            {console.error(err)}
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
        //TODO
    }

    setCurrentGame(gameId){
        function notifyACB(){    
            this.notifyObservers();
            }
        if (this.currentGameID!==gameId){
            if (gameId){
                this.currentGameID=gameId
                this.notifyObservers({idCurrentGame: gameId})
                return resolvePromise(this.getGameDetails(gameId),this.currentGamePromiseState, notifyACB.bind(this));
            }
        }
    }

    getPlayerObject(playerID){
    // get player object from Firebase
    }
}

export default GameModel;

