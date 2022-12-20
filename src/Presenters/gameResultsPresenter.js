import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState(props.model.user);  
    const [opponent, setOpponent] = React.useState(props.model.currentOpponent);
    const [game, setGame] = React.useState(props.model.currentGame);

    function observerACB(){   
        setPlayer(props.model.user);    // when notified these will update states with current value in model
        setOpponent(props.model.currentOpponent);
        setGame(props.model.currentGame);
    }

    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

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
        onClickHome={goBackACB}
        onClickGame={startGameACB}
        />;
}
