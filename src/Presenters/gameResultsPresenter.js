import GameResultsView from "../Views/gameResultsView/gameResultsView.js";

export default
function GameResults(props){
    function checkPlayerTurn(){
        return props.model.currentGame.turn == props.model.currentPlayer.playerId;
    }
    return <GameResultsView playerData={props.model.getPlayerObject(props.model.currentPlayerId)} opponentData={props.model.getPlayerObject(props.model.getOpponentId())} gameData={props.model.getGameDetails(props.model.currentGameId)} isPlayerTurn={checkPlayerTurn}/>;
}
