import "./gameResultsView.css"
import profilePicMan from "../../Assets/Images/man.png"
import profilePicWoman from "../../Assets/Images/woman.png"
import correct from "../../Assets/Images/correct.png"
import incorrect from "../../Assets/Images/incorrect.png"

export default
function GameResultsView(props){

    function renderHeader(){
        //TODO add tie
        return props.gameData.winner ? 
        (props.gameData.winner == props.playerData.username ? <div id="end" className="header">You won!</div> : <div id="end" className="header">"You lost!"</div>) :
        (props.gameData.turn == props.playerData.username ? <div className="header">Your turn</div> : <div className="header">"Opponents turn"</div>);
    }
    function renderProfilePic(playerNum){
        return props.playerData.username==props.gameData[playerNum] ? 
            <img src={props.playerData.profilePicture} widht="55" height="55" alt="text"/> : 
            <img src={props.opponentData.profilePicture} widht="55" height="55" alt="text"/>
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
                playerNr=="player1" ? pointBox = "pointBoxLeft" : pointBox = "pointBoxRight"
    
                if (!score){
                    return <div key={playerNr + counter.toString()} className={pointBox}><span className="dot"></span></div>
                }
                if(counter == (latest*3)-2 && props.gameData.turn == props.gameData[playerNr]){
                    if(score == "correct"){ 
                        return <div key={playerNr + counter.toString()} id='newResultQ1' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                    } 
                    return <div key={playerNr + counter.toString()} id='newResultQ1' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                }
                if (counter == latest*3-1 && props.gameData.turn == props.gameData[playerNr]){
                    if(score == "correct"){
                        return <div key={playerNr + counter.toString()} id='newResultQ2' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div> 
                    }
                    return <div key={playerNr + counter.toString()} id='newResultQ2' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                }
                if (counter == latest*3 && props.gameData.turn == props.gameData[playerNr]){
                    if (score == "correct"){ 
                        return <div key={playerNr + counter.toString()} id='newResultQ3' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div> 
                    }
                    return <div key={playerNr + counter.toString()} id='newResultQ3' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div> 
                } 
                if (score == "correct"){ 
                    return<div key={playerNr + counter.toString()} className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                }
                return <div key={playerNr + counter.toString()} className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>            
            }
            counter = counter + 1;
            return playerNr == 1 ? renderScoreIcon("player1") : renderScoreIcon("player2");
        }
        let counter = 0;
        const latest = props.gameData.resultPlayer1.length > props.gameData.resultPlayer2.length ? props.gameData.resultPlayer1.length : props.gameData.resultPlayer2.length;

        return [...results, Array(15-(3*results.length)).fill(null)].reduce(listReducerCB, []).map(renderScoresCB);
    }
    function goToGameACB(){props.onClickGame()}
    function renderPlayButton(){
        return <button onClick={goToGameACB} className="buttonPlay">Play</button>;
        /*return props.playerData.username == props.gameData.turn ?
            <button onClick={goToGameACB} className="buttonPlay">Play</button> : null;*/
    }
    function goBackACB(){props.onClickHome()}
    function renderBackButton(){
        return <button onClick={goBackACB} className="buttonBack">Back</button>
        /*return props.playerData.username == props.gameData.turn ?
            <button onClick={goBackACB} className="buttonBack">Back</button>:
            <button id="centerButton" onClick={goBackACB} className="buttonBack">Back</button>*/
        }
    
    return (
        <div className="fullPage">
        {renderHeader()}
        <div className="gridParent">
            <div className="totalScore">
                <div>Score</div>
                <div>{props.gameData.score.player1} : {props.gameData.score.player2}</div>
            </div>  
            <div className="gridItemNameLeft">
                {renderProfilePic("player1")}
                {renderPlayerName(props.gameData.player1)}
            </div>
            <div className="gridItemNameRight">
                {renderProfilePic("player2")}
                {renderPlayerName(props.gameData.player2)}
            </div>
            <div className="gridItemScoresLeft">
                <div className="gridParentScores">
                    {renderScoreGrid(props.gameData.resultPlayer1, 1)}
                </div>
            </div>
            <div className="gridItemScoresRight">
                <div className="gridParentScores">
                    {renderScoreGrid(props.gameData.resultPlayer2, 2)}
                </div>
            </div>
            {renderBackButton()}
            {renderPlayButton()}
        </div>
    </div>
    )
}