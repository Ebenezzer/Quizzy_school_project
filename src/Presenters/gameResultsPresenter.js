import GameResultsView from "..\Views\gameResultsView\gameResultsView.js/";

export default
function GameResults(props){
    function checkPlayerTurn(){
        return props.model.currentGame.turn == props.model.currentPlayer.playerId;
    }
    return <GameResultsView playerData={/*player object*/} opponentData={/*player object*/} gameData={/*the game object*/} isPlayerTurn={checkPlayerTurn}/>; //playerData={/*player object*/} opponentData={/*player object*/} gameData={/*the game object*/}
}