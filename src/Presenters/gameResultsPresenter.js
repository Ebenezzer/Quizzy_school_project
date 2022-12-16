import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState();  //TODO props.model...
    const [opponent, setOpponent] = React.useState();
    const [game, setGame] = React.useState();

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

    function checkPlayerTurn(){
        return 1;
        //return props.model.getGameDetails(props.model.currentGameId).turn == props.model.currentPlayerId;
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
        onClickHome={goBackACB}
        onClickGame={startGameACB}
        />;
}
