import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import profilePicMan from "../Assets/Images/man.png"
import { set } from 'firebase/database';

//TODO Test data to remove later:
const exampleUser = {
    username: "matilda",
    score: 2,
    games: ["asdf1234"],
    profilePicture: profilePicMan
}
const exampleOpponent = {
    username: "david",
    score: 0,
    games: ["asdf1234"],
    profilePicture: profilePicMan
}
const exampleGame = {
    gameId: "asdf1234",
    player1: "matilda",
    player2: "david",
    turn: "matilda",
    winner: undefined,
    currentRound: 3,
    score: {
        player1: 3,
        player2: 1,
    },
    resultPlayer1: [["correct", "incorrect", "incorrect"], ["correct", "correct", "incorrect"]],
    resultPlayer2: [["incorrect", "incorrect", "incorrect"], ["correct", "incorrect", "incorrect"]]
}

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState(props.model.currentPlayerObject);  
    const [opponent, setOpponent] = React.useState(props.model.getOpponent);
    const [game, setGame] = React.useState(props.model.currentGameObject);

    function observerACB(){   
        setPlayer(props.model.user);    // when notified, update state with current value in model
        setOpponent(props.model.getOpponent);
        setGame(props.model.currentGame);
    }

    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function checkGameFinished(){
        //TODO check if length of resultlists for pl.2 is 5 and run setWinner in model, return truthy (finished) or falsy
    }
    function goBackACB(){
        navigate("/home");
    }
    function startGameACB(){
        navigate("/category");
    }
    
    return <GameResultsView 
        /*playerData={player}  //TODO
        opponentData={opponent} 
        gameData={game} */
        playerData={exampleUser} 
        opponentData={exampleOpponent} 
        gameData={exampleGame}
        isGameFinished={checkGameFinished} 
        onClickHome={goBackACB}
        onClickGame={startGameACB}
        />;
}
