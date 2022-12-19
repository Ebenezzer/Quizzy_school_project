import { authChange, updateFirebaseFromModel, updateModelFromFirebase, getCurrentOpponent} from "./firebase/firebaseModel";
import { getQuestions } from "./questionSource";
import resolvePromise from "./resolvePromise";



class GameModel{
    constructor(gameArray=[]){
        this.user = {};  //samma som currentPlayerObject ?
        this.currentGame = {};
        this.currentGameId = "";
        this.observers=[];
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
        this.questionsPromiseState = {};
        this.currentUser = undefined; // to save data from firebase into
        this.addAuthObserver();
        this.roundResults=[];
        this.currentOpponent = {};
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
            // run off() functions for firebase listeners + try catch for user presence
            this.currentUser = user;
            if(this.currentUser){
                updateFirebaseFromModel(this)
                updateModelFromFirebase(this)
            }
            this.notifyObservers()
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
    
    addGameToModel(game){
        this.notifyObservers({games: this.games});
        this.games = Object.keys(game)
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

    setCurrentGame(game){     
        if (game && this.currentGame!==game){
            this.currentGame=game
            this.notifyObservers();
        }
    }

    updateScore(){
        this.user.score ++;
        console.log(this.user)
        this.notifyObservers({score: this.user.score});
    }

    setUser(user){// call on login or create account
        this.notifyObservers({user: user})
        this.user = user
    }

    setCurrentOpponent(opponent){
        this.currentOpponent=opponent;
    }

    updateCurrentOpponent(opponentUsername){
        getCurrentOpponent(this, opponentUsername)
    }

    setGameInfo(gameInfo){
        this.games = [...gameInfo]
        console.log(this.games)
        // add observer
    }

    createNewGame(username){
        this.notifyObservers({newGame: {
            player1: this.user.username,
            player2: username,
            turn: this.user.username,
            currentRound: 1,
            score: {
                player1: 0,
                player2: 0,
            },
            resultPlayer1:[],
            resultPlayer2:[]
        }});
    }
    
    //TODO samma som setUser?
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

    setRoundResults(roundResults){
        this.roundResults=roundResults;
    }

    updateResults(playerNr){
        function checkAnswerCB(sum, answer){
            return answer === "correct" ? sum+1 : sum; 
        }
        if (playerNr === "player1"){
            this.currentGame.resultPlayer1=[...this.currentGame.resultPlayer1, this.roundResults]
            this.currentGame.score.player1+=this.roundResults.reduce(checkAnswerCB, 0)
        }
        if (playerNr === "player2"){
            this.currentGame.resultPlayer2=[...this.currentGame.resultPlayer2, this.roundResults]
            this.currentGame.score.player2+=this.roundResults.reduce(checkAnswerCB, 0)
        }
        if (this.currentGame.resultPlayer2.length === 5){
            this.currentGame.winner = this.currentGame.score.player1 > this.currentGame.score.player2 ? this.currentGame.player1 :this.currentGame.player2;
            if (this.currentGame.winner == this.user.username){
                this.updateScore();
            }
        }
        if (this.currentGame.resultPlayer1.length === this.currentGame.resultPlayer2.length){
            this.currentGame.currentRound++ ;
        }
        if (this.currentGame.resultPlayer1.length !== this.currentGame.resultPlayer2.length){
            this.currentGame.turn = playerNr === "player1" ? this.currentGame.player2 : this.currentGame.player1
        }
        this.roundResults = [];
        this.updateGame();
    } 
    setCurrentGameId(gameId){
        this.currentGameId=gameId;
    }
    updateGame(){
        this.notifyObservers({updatedGame : this.currentGame})
    }
}

export default GameModel;

