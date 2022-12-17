import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState(props.model.currentPlayerObject);  
    const [opponent, setOpponent] = React.useState();  //TODO props.model...
    const [game, setGame] = React.useState(props.model.currentGameObject);

    function observerACB(){   
        setPlayer(props.model.currentPlayerObject);    // when notified, update state with current value in model
        setOpponent(/*props.model.*/);
        setGame(props.model.currentGameObject);
    }

    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function checkPlayerTurn(){
        return 1;
        //return props.model.currentGameObject.turn == props.model.currentPlayerObject.???
    }
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
        playerData={player} 
        opponentData={opponent} 
        gameData={game} 
        isPlayerTurn={checkPlayerTurn}
        isGameFinished={checkGameFinished} 
        onClickHome={goBackACB}
        onClickGame={startGameACB}
        />;
}
