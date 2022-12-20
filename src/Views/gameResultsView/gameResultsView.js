import "./gameResultsView.css"
import correct from "../../Assets/Images/correct.png"
import incorrect from "../../Assets/Images/incorrect.png"
// check if resultPlayer1 & 2 is truthy, otherwise define as empty list
export default
function GameResultsView(props){
    function renderHeader(){
        return props.gameData.winner ? 
            (props.gameData.winner === "tie" ? <div id="end" className="header">It's a tie!</div> : props.gameData.winner === props.playerData.username ? <div id="end" className="header">You won!</div> : <div id="end" className="header">"You lost!"</div>) :
            (props.gameData.turn === props.playerData.username ? <div className="header">Your turn</div> : <div className="header">Opponent's turn</div>);
    }
    function renderProfilePic(playerNum){
        console.log("opponent")
        console.log(props.opponentData)
        return props.playerData.username==props.gameData[playerNum] ? 
            <img src={props.playerData.profilePictureSrc} width="55" height="55"/> : 
            <img src={props.opponentData.profilePictureSrc} width="55" height="55"/>
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
        //TODO
        let counter = 0;
        let latest = 1;
        if (props.gameData.resultPlayer1 && props.gameData.resultPlayer2){
            let latest = props.gameData.resultPlayer1.length > props.gameData.resultPlayer2.length ? props.gameData.resultPlayer1.length : props.gameData.resultPlayer2.length;
        }
        
        return [...results, Array(15-(3*results.length)).fill(null)].reduce(listReducerCB, []).map(renderScoresCB);
    }
    function renderScoreCounter(){
        return <div>{props.gameData.score.player1} : {props.gameData.score.player2}</div>
    }
    function goToGameACB(){props.onClickGame()}
    function renderPlayButton(){
        return props.playerData.username == props.gameData.turn ?
            <button onClick={goToGameACB} className="buttonPlay">Play</button> : null;
    }
    function goBackACB(){props.onClickHome()}
    function renderBackButton(){
        return props.playerData.username == props.gameData.turn ?
            <button onClick={goBackACB} className="buttonBack">Back</button>:
            <button id="centerButton" onClick={goBackACB} className="buttonBack">Back</button>
        }

    props.checkGameScore();
    props.checkGameResults();
    return (
        <div className="fullPage">
        {renderHeader()}
        <div className="gridParent">
            <div className="totalScore">
                <div>Score</div>
                {renderScoreCounter()}
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