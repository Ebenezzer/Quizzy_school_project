import "./gameResultsView/gameResultsView.css"

export default
function GameResultsView(props){
    function renderHeadline(turn){
        return turn == props.playerData.playerId ? "Your turn" : "Opponents turn"
    }
    function getPlayerObject(playerId){
        return playerId == props.playerData.playerId ? props.playerData : props.opponentData;  
        //perhaps put in model, function returning the player object with a certain id 
    }
    function renderScores(result, playerNr){
        function renderPointCB(point){
            return point ? <div>1</div> : <div>0</div> //render 1 for correct answer and 0 for wrong
        }
        function renderEmptyScore(){return <div>-</div>}
        if (playerNr == 1){
            if (!result[0]){renderEmptyScore();} // if result of a round is undefined, we want to render empty score boxes
            result[0].map(renderPointCB)
        }
        if (!result[1]){
            renderEmptyScore();
            renderEmptyScore();
            renderEmptyScore();
        }
            result[1].map(renderPointCB)
    }
    
    return <div>
        <div className="header">Your Turn</div>
        <div className="gridParent">
            <div className="gridItemNameLeft">
                <img src="https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png" widht="40" height="40" alt="text"/>
                <div >Player 1</div>
            </div>
            <div className="gridItemNameRight">
                <img className="icon" src="https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png" widht="40" height="40" alt="text"/>
                <span>Player 2</span>
            </div>
            <div className="gridItemScoresLeft">
                <div className="gridParentScores">
                    <div className="pointBox"><img src="https://i.imgur.com/60PVLis.png" widht="30" height="30" alt="text"/></div>
                    <div className="pointBox"><img src="https://cdn2.iconfinder.com/data/icons/web-and-apps-interface/32/Cancel-512.png" widht="3" height="30" alt="text"/></div>
                    <div className="pointBox"><span className="dot"></span></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                </div>
            </div>
            <div className="gridItemScoresRight">
                <div className="gridParentScores">
                <div className="pointBox">x</div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                    <div className="pointBox"></div>
                </div>
            </div>
            <button className="buttonItem">Play</button>
        </div>
    </div>
}