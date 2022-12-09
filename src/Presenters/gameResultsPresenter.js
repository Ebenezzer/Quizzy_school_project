import GameResultsView from "..\Views\gameResultsView\gameResultsView.js/";

export default
function GameResults(props){
    function checkPlayerTurn(){
        return props.model.getGameDetails(props.model.currentGameId).turn == props.model.currentPlayerId;
    }
    
    return <GameResultsView playerData={props.model.getPlayerObject(props.model.currentPlayerId)} opponentData={props.model.getPlayerObject(props.model.getOpponentId())} gameData={props.model.getGameDetails(props.model.currentGameId)} isPlayerTurn={checkPlayerTurn}/>;
}
