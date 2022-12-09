import resolvePromise from "./resolvePromise";

class GameModel{
    constructor(gameArray=[]){
        this.observers=[];
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
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
    // get player information from Firebase
    }

    getOpponentId(){
        return getGameDetails(this.currentGameId).player1 != props.model.currentPlayerId ? 
            getGameDetails(this.currentGameId).player1 :
            getGameDetails(this.currentGameId).player2;
    }
}

export default GameModel;

