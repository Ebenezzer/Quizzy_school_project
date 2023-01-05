import GameResultsView from '../Views/gameResultsView/gameResultsView';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import promiseNoData from '../Views/promiseNoData/promiseNoData';

export default
function GameResults(props){
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState(props.model.user);  
    //const [opponent, setOpponent] = React.useState(props.model.currentOpponent);
    const [game, setGame] = React.useState(props.model.currentGame);
    const [opponentPromiseStatePromise, setOpponentPromiseStatePromise] = React.useState(props.model.opponentPromiseState.promise);
    const [opponentPromiseStateData, setOpponentPromiseStateData] = React.useState(props.model.opponentPromiseState.data);
    const [opponentPromiseStateError, setOpponentPromiseStateError] = React.useState(props.model.opponentPromiseState.error);

    function observerACB(){   
        setPlayer(props.model.user);    // when notified these will update states with current value in model
        //setOpponent(props.model.currentOpponent);
        setGame(props.model.currentGame);
        setOpponentPromiseStatePromise(props.model.opponentPromiseState.promise);
        setOpponentPromiseStateData(props.model.opponentPromiseState.data);
        setOpponentPromiseStateError(props.model.opponentPromiseState.error);
    }

    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function checkScore(){
        if (!game.score){
            props.model.setInitialGameScore();
        }
    }
    function checkResults(){
        if (!game.resultPlayer1){
            props.model.setInitialResult(1)
        }
        if (!game.resultPlayer2){
            props.model.setInitialResult(2)
        }
    }

    function goBackACB(){
        navigate("/home");
    }
    function startGameACB(){
        navigate("/category");
    }
    console.log(opponentPromiseStateData)
    return promiseNoData({promise: opponentPromiseStatePromise, data:opponentPromiseStateData, error: opponentPromiseStateError})
    ||<GameResultsView 
        playerData={player}
        opponentData={opponentPromiseStateData} 
        gameData={game}
        checkGameScore = {checkScore}
        checkGameResults = {checkResults}
        onClickHome={goBackACB}
        onClickGame={startGameACB}
    />;
}
