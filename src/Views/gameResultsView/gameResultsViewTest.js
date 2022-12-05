import "./gameResultsView.css"

export default
function GameResultsView(props){
    
    const exampleResult1 = ["correct", "correct", "incorrect", null, null, null, null, null, null, null, null, null, null, null, null];
    const exampleResult2 = ["correct", "correct", "incorrect", "incorrect", "correct", "correct", null, null, null, null, null, null, null, null, null];
    
    function renderHeader(turn){
        return turn == props.playerData.playerId ? "Your turn" : "Opponents turn";
    }
    function getPlayerObject(playerId){
        return playerId == props.playerData.playerId ? props.playerData : props.opponentData;  
        //perhaps put in model, function returning the player object with a certain id 
    }
    function renderTotalScore(props){
        return props.gameData.score.player1.toString() + " : " + props.gameData.score.player2.toString();
    }
    function renderProfilePic(pic){
        return <img src={pic} widht="40" height="40" alt="text"/>
    }
    function renderPlayerName(name){
        return <div>{name}</div>
    }
    function renderScoreGrid(resultList, playerNr){
        function renderScoresCB(score){
            if (playerNr == 1){
                return !score ? 
                    <div className="pointBoxLeft"><span className="dot"></span></div> : 
                    score == "correct" ? 
                        <div className="pointBoxLeft"><img src="https://i.imgur.com/60PVLis.png" widht="30" height="30" alt="text"/></div> : 
                        <div className="pointBoxLeft"><img src="https://cdn2.iconfinder.com/data/icons/web-and-apps-interface/32/Cancel-512.png" widht="3" height="30" alt="text"/></div> 
            }
            return !score ? 
                    <div className="pointBoxRight"><span className="dot"></span></div> : 
                    score == "correct" ? 
                        <div className="pointBoxRight"><img src="https://i.imgur.com/60PVLis.png" widht="30" height="30" alt="text"/></div> : 
                        <div className="pointBoxRight"><img src="https://cdn2.iconfinder.com/data/icons/web-and-apps-interface/32/Cancel-512.png" widht="3" height="30" alt="text"/></div> 
        }
        return resultList.map(renderScoresCB);
    }
    function goToGameACB(){
        window.location.hash = "#category";
    }
    function isPlayerTurn(){
        return props.gameData.turn !== props.playerData.playerId;
    }
    
    return <div>
        <div className="header">Your Turn</div>
        <div className="gridParent">
            <div className="totalScore"><div>2 : 4</div></div>  
            <div className="gridItemNameLeft">
                {renderProfilePic("https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png")}
                {renderPlayerName("Player1")}
            </div>
            <div className="gridItemNameRight">
                {renderProfilePic("https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png")}
                {renderPlayerName("Player2")}
            </div>
            <div className="gridItemScoresLeft">
                <div className="gridParentScores">
                    {renderScoreGrid(exampleResult1, 1)}
                </div>
            </div>
            <div className="gridItemScoresRight">
                <div className="gridParentScores">
                    {renderScoreGrid(exampleResult2, 2)}
                </div>
            </div>
            <button disabled={0} onClick={goToGameACB} className="buttonItem" >Play</button>
        </div>
    </div>
}