export default
function GameResultsView(props){
    function renderHeadline(turn){
        return turn == props.playerData.playerId ? "Your turn" : "Opponents turn"};

    function getPlayerObject(playerId){
        return playerId == props.playerData.playerId ? props.playerData : props.opponentData;  
        //perhaps put in model, function returning the player object with a certain id 
    }

    function renderScores(result, playerNr){
        function renderPointCB(point){
            return point ? <div>1</div> : <div>0</div> //render 1 for correct answer and 0 for wrong
        }
        function renderEmptyRound(){
            return <div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
            </div>
        }
        if (playerNr == 1){
            if (!result[0]){renderEmptyRound();} // if result of a round is undefined, we want to render empty score boxes
            result[0].map(renderPointCB)
        }
        if (!result[1]){renderEmptyRound();}
            result[1].map(renderPointCB)
    }
    

    return <div>
        <div>{renderHeadline(props.turn)}</div>
        <div className="gridParent">
            <div className="gridItemNameLeft">
                <div className="alignLeft">{props.model.getPlayerObject(props.gameData.player1).username}</div>
            </div>
            <div className="gridItemNameRight">
                <div className="alignRight">{props.model.getPlayerObject(props.gameData.player2).username}</div>
            </div>
            <div className="gridItemScoresLeft">
                <div className="gridParentScores">
                    <div className="round1">{renderScores(props.gameData.result.round1, 1)}</div>
                    <div className="round2">{renderScores(props.gameData.result.round2, 1)}</div>
                    <div className="round3">{renderScores(props.gameData.result.round3, 1)}</div>
                    <div className="round4">{renderScores(props.gameData.result.round4, 1)}</div>
                    <div className="round5">{renderScores(props.gameData.result.round5, 1)}</div>
                </div>
            </div>
            <div className="gridItemScoresRight">
                <div className="gridParentScores">
                    <div className="round1">{renderScores(props.gameData.result.round1, 2)}</div>
                    <div className="round2">{renderScores(props.gameData.result.round2, 2)}</div>
                    <div className="round3">{renderScores(props.gameData.result.round3, 2)}</div>
                    <div className="round4">{renderScores(props.gameData.result.round4, 2)}</div>
                    <div className="round5">{renderScores(props.gameData.result.round5, 2)}</div>
                </div>
            </div>
            <div className="alignCenter"><button disabled>Play</button></div>
        </div>
    </div>
}