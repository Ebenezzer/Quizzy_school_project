import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState();  //TODO props.model...
    const [opponent, setOpponent] = React.useState();
    const [game, setGame] = React.useState();
    //const [startGame, setStartGame] = React.useState(); //set if user pushes play-button
    //const [goBack, setGoBack] = React.useState(); //set if user pushes back-button

    function observerACB(){   
        setPlayer(/*props.model.getPlayerObject(props.model.currentPlayerId)*/);    // when notified, update state with current value in model
        setOpponent(/*props.model.getPlayerObject(props.model.getOpponentId())*/);
        setGame(/*props.model.getGameDetails(props.model.currentGameId)*/);
    }

    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    /*
    React.useEffect(() => {
        if (startGame) navigate("/category")}, [startGame]);  // effect: function to re-navigate, executes when startGame changes value and is truthy

    React.useEffect(() => {
        if (goBack) navigate("/home")}, [goBack]);
    */

    function checkPlayerTurn(){
        return props.model.getGameDetails(props.model.currentGameId).turn == props.model.currentPlayerId;
    }
    function goBackACB(){
        //setGoBack(true);
        navigate("/home");

    }
    function startGameACB(){
        //setStartGame(true);
        navigate("/category");
    }
    
    return <GameResultsView 
        playerData={player} 
        opponentData={opponent} 
        gameData={game} 
        isPlayerTurn={checkPlayerTurn} 
        onClickHome={goBackACB}
        onClickGame={startGameACB}
        />;
}
