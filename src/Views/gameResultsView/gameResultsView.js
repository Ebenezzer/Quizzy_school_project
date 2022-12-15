import "./gameResultsView.css"
import profilePicMan from "../../Assets/Images/man.png"
import profilePicWoman from "../../Assets/Images/woman.png"
import correct from "../../Assets/Images/correct.png"
import incorrect from "../../Assets/Images/incorrect.png"

export default
function GameResultsView(props){
    //dummy data to remove later:
    const exampleResult1 = [["correct", "correct", "incorrect"], [null, null, null], [null, null, null], [null, null, null], [null, null, null]];
    const exampleResult2 = [["correct", "incorrect", "incorrect"], ["correct", "correct", "incorrect"], [null, null, null], [null, null, null], [null, null, null]]
    const currentRound = 2;
    
    function renderHeader(turn){
        return props.gameData.winner ? 
        "" //TODO --> You won! or You lost!, add in a div with class or id with animation ex grow
        :turn == props.playerData.playerId ? "Your turn" : "Opponents turn";
    }
    function renderTotalScore(props){
        return props.gameData.score.player1.toString() + " : " + props.gameData.score.player2.toString();
    }
    function renderProfilePic(pic){
        return <img src={pic} widht="55" height="55" alt="text"/>
    }
    function renderPlayerName(name){
        return <div className="name">{name}</div>
    }
    function renderScoreGrid(results, playerNr){
        function listReducerCB(accumulator, list){
            return [...accumulator, ...list];
        }

        function renderScoresCB(score){
            function renderScoreIcon(playerNr){
                let pointBox = "";
                playerNr==1 ? pointBox = "pointBoxLeft" : pointBox = "pointBoxRight"
    
                if (!score){
                    return <div className={pointBox}><span className="dot"></span></div>
                }
                if(counter == (currentRound*3)-2){
                    if(score == "correct"){ 
                        return <div id='newResultQ1' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                    } 
                    return <div id='newResultQ1' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                }
                if (counter == currentRound*3-1){
                    if(score == "correct"){
                        return <div id='newResultQ2' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div> 
                    }
                    return <div id='newResultQ2' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                }
                if (counter == currentRound*3){
                    if (score == "correct"){ 
                        return <div id='newResultQ3' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div> 
                    }
                    return <div id='newResultQ3' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div> 
                } 
                if (score == "correct"){ 
                    return<div className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                }
                return <div className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>            
            }
            counter = counter + 1;
            return playerNr == 1 ? renderScoreIcon(1) : renderScoreIcon(2);
        }
        let counter = 0;
        return results.reduce(listReducerCB, []).map(renderScoresCB);
    }
    /*
    function goToGameACB(){
        window.location.hash = "#category";
    }
    function goToHomeACB(){
        window.location.hash = "#home";
    }*/
    
    return <div className="fullPage">
        <div className="header">Your Turn</div>
        <div className="gridParent">
            <div className="totalScore">
                <div>Score</div>
                {/*<div>{props.gameData.score.player1} : {props.gameData.score.player2}</div>*/}
                <div>2 : 3</div>
            </div>  
            <div className="gridItemNameLeft">
                {renderProfilePic(profilePicMan)}
                {renderPlayerName("Player1")}
            </div>
            <div className="gridItemNameRight">
                {renderProfilePic(profilePicWoman)}
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
            <button onClick={props.onClickHome} className="buttonBack">Back</button>
            <button disabled={0} onClick={props.onClickGame} className="buttonPlay">Play</button>
        </div>
    </div>
}