import { authChange, updateFirebaseFromModel, updateModelFromFirebase, updateGameInfoFromFirebase, getCurrentOpponent} from "./firebase/firebaseModel";
import { getQuestions } from "./questionSource";
import resolvePromise from "./resolvePromise";



class GameModel{
    constructor(gameArray=[], playersArray = []){
        this.user = {};
        this.username =
        this.currentGame = {};
        this.observers=[];
        this.players = playersArray;
        this.games = gameArray;
        this.searchGameIDPromiseState = {};
        this.currentGamePromiseState = {};
        this.questionsPromiseState = {};
        this.opponentPromiseState = {};
        this.currentUser = undefined;
        this.addAuthObserver();
        this.roundResults=[];
        this.counter = 0; 
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
            if(this.currentUser){
                updateFirebaseFromModel(this)
                if (this.currentUser.displayName){
                    updateModelFromFirebase(this)
                }
                try{updateGameInfoFromFirebase(this)}
                catch{console.log("fetching issues")}
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

    addGame(gameToAdd){
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

    setCurrentGame(game){     
        if (game && this.currentGame!==game){
            this.currentGame=game
            this.notifyObservers();
        }
    }

    updateScore(){
        this.user.score ++;
        this.notifyObservers({score: this.user.score});
    }

    setUser(user){
        this.notifyObservers({user: user})
        this.user = user
    }

    setCurrentOpponent(){
        function notifyACB(){    
            this.notifyObservers();
        }

        resolvePromise(getCurrentOpponent(this.user.username !== this.currentGame.player1 ? this.currentGame.player1 : this.currentGame.player2), this.opponentPromiseState, notifyACB.bind(this));
    }

    setPlayers(playersObject){
        this.players = playersObject
        this.notifyObservers()
    }

    setGameInfo(gameInfo){
        this.games = [...gameInfo]
        this.notifyObservers()
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

    getNewQuestions(category){
        function notifyACB(){
            this.notifyObservers();
        }
        resolvePromise(getQuestions({limit: 3, categories: category}), this.questionsPromiseState, notifyACB.bind(this));
    }
    setInitialGameScore(){
        this.currentGame.score = {player1:0, player2:0}
    }

    setInitialResult(playerNr){
        if(playerNr===1){
            this.currentGame["resultPlayer1"] = [];
        }
        if(playerNr===2){
            this.currentGame["resultPlayer2"] = [];
        }
    }

    setRoundResults(roundResults){
        this.roundResults=roundResults;
    }

    updateResults(playerNr){
        if (this.roundResults.length === 3){
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
                this.currentGame.winner = this.currentGame.score.player1 > this.currentGame.score.player2 ? this.currentGame.player1 : this.currentGame.score.player1 === this.currentGame.score.player2 ? "tie" : this.currentGame.player2;
                if (this.currentGame.winner === this.user.username){
                    this.updateScore();
                }
            }
            if (this.currentGame.resultPlayer1.length === this.currentGame.resultPlayer2.length){
                this.currentGame.currentRound++ ;
            }
            this.currentGame.turn = playerNr === "player1" ? this.currentGame.player2 : this.currentGame.player1
            this.roundResults = [];
            this.notifyObservers({updatedGame : this.currentGame})
        }
    } 

    setGameId(gameId){
        this.currentGame.gameId = gameId;
    }

    getGameList(){
        updateGameInfoFromFirebase(this)
    }
    
    increaseCounter(){
        this.counter += 1;
    }
}

export default GameModel;

