import "./gameResultsView.css"
import profilePic from "../../Assets/Images/profile_pic.png"
import correct from "../../Assets/Images/correct.png"
import incorrect from "../../Assets/Images/incorrect.png"

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
    function renderScoreGrid(result, playerNr){
        function toList(lists){
            //TODO
        }
        function renderScoresCB(score){
            if (playerNr == 1){
                return !score ? 
                    <div className="pointBoxLeft"><span className="dot"></span></div> : 
                    score == "correct" ? 
                        <div className="pointBoxLeft"><img src={correct} widht="30" height="30" alt="text"/></div> : 
                        <div className="pointBoxLeft"><img src={incorrect} widht="3" height="30" alt="text"/></div> 
            }
            return !score ? 
                    <div className="pointBoxRight"><span className="dot"></span></div> : 
                    score == "correct" ? 
                        <div className="pointBoxRight"><img src={correct} widht="30" height="30" alt="text"/></div> : 
                        <div className="pointBoxRight"><img src={incorrect} widht="3" height="30" alt="text"/></div> 
        }
        return result.map(renderScoresCB);
    }
    function goToGameACB(){
        window.location.hash = "#category";
    }
    function goToHomeACB(){
        window.location.hash = "#home";
    }
    function isPlayerTurn(){
        return props.gameData.turn !== props.playerData.playerId;
    }
    
    return <div>
        <div className="header">Your Turn</div>
        <div className="gridParent">
            <div className="totalScore">
                <div>Score</div>
                <div>2 : 4</div>
            </div>  
            <div className="gridItemNameLeft">
                {renderProfilePic(profilePic)}
                {renderPlayerName("Player1")}
            </div>
            <div className="gridItemNameRight">
                {renderProfilePic(profilePic)}
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
            <button onClick={goToHomeACB} className="buttonBack">Back</button>
            <button disabled={0} onClick={goToGameACB} className="buttonPlay">Play</button>
        </div>
    </div>
}