import "./gameResultsView.css"
import correct from "../../Assets/Images/correct.png"
import incorrect from "../../Assets/Images/incorrect.png"

export default
function GameResultsView(props){
    function renderHeader(){
        //checks if the game is over and in that case renders if the player won,lost or if it's a tie. 
        //Otherwise it renders if it is your turn or not
        return props.gameData.winner ? 
            (props.gameData.winner === "tie" ? <div id="end" className="header">It's a tie!</div> : props.gameData.winner === props.playerData.username ? <div id="end" className="header">You won!</div> : <div id="end" className="header">"You lost!"</div>) :
            (props.gameData.turn === props.playerData.username ? <div className="header">Your turn</div> : <div className="header">Opponent's turn</div>);
    }
    function renderProfilePic(playerNum){
        //checks which player and renders the profile picture
        return props.playerData.username===props.gameData[playerNum] ? 
            <img src={props.playerData.profilePictureSrc} width="55" height="55" alt=""/> : <img src={props.opponentData.profilePictureSrc} width="55" height="55" alt=""/>
    }
    function renderPlayerName(name){
        //renders the player's username
        return <div className="name">{name}</div>
    }
    function renderScoreGrid(results, playerNr){
        //render the score icons for a player showing if a question was answered correctly or incorrecly 
        function listReducerCB(accumulator, list){
            //turn into a single list
            return [...accumulator, ...list];
        }
        function renderScoresCB(score){
            function renderScoreIcon(playerNr){
                let pointBox = "";
                playerNr === "player1" ? pointBox = "pointBoxLeft" : pointBox = "pointBoxRight";

                //render empty gray icon if quesion not answered yet
                if (!score){
                    return <div key={playerNr + counter.toString()} className={pointBox}><span className="dot"></span></div>
                }
                
                //if it is the latest result, render the score with an animation
                if(counter === (latestResultRound*3)-2){
                    if((playerNr==="player1" && (props.gameData.resultPlayer1.length > props.gameData.resultPlayer2.length)) || (playerNr==="player2" && (props.gameData.resultPlayer1.length === props.gameData.resultPlayer2.length))){
                        if(score === "correct"){ 
                            return <div key={playerNr + counter.toString()} id='newResultQ1' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                        } 
                        return <div key={playerNr + counter.toString()} id='newResultQ1' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                    }
                }
                if(counter === (latestResultRound*3)-1){
                    if((playerNr==="player1" && (props.gameData.resultPlayer1.length > props.gameData.resultPlayer2.length)) || (playerNr==="player2" && (props.gameData.resultPlayer1.length === props.gameData.resultPlayer2.length))){
                        if(score === "correct"){ 
                            return <div key={playerNr + counter.toString()} id='newResultQ2' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                        } 
                        return <div key={playerNr + counter.toString()} id='newResultQ2' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                    }
                }
                if(counter === (latestResultRound*3)){
                    if((playerNr==="player1" && (props.gameData.resultPlayer1.length > props.gameData.resultPlayer2.length)) || (playerNr==="player2" && (props.gameData.resultPlayer1.length === props.gameData.resultPlayer2.length))){
                        if(score === "correct"){ 
                            return <div key={playerNr + counter.toString()} id='newResultQ3' className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                        } 
                        return <div key={playerNr + counter.toString()} id='newResultQ3' className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>
                    }
                }

                // otherwise, check if it was anwered correcly or not and render the corresponding image
                if (score === "correct"){ 
                    return <div key={playerNr + counter.toString()} className={pointBox}><img src={correct} widht="35" height="35" alt="text"/></div>
                }
                return <div key={playerNr + counter.toString()} className={pointBox}><img src={incorrect} widht="35" height="35" alt="text"/></div>            
            }
            counter = counter + 1;  
            return playerNr === 1 ? renderScoreIcon("player1") : renderScoreIcon("player2");
        }
        let counter = 0; //a counter for the question number
        let latestResultRound = props.gameData.resultPlayer1.length >= props.gameData.resultPlayer2.length ? props.gameData.resultPlayer1.length : props.gameData.resultPlayer2.length; //checks which round the latest result is from
        return [...results, Array(15-(3*results.length)).fill(null)].reduce(listReducerCB, []).map(renderScoresCB);
    }
    function renderScoreCounter(){
        //render score for player 1 and 2
        return <div>{props.gameData.score.player1} : {props.gameData.score.player2}</div>
    }
    function renderPlayButton(){
        //render the play button if it is the players turn and the game is not over
        return props.playerData.username === props.gameData.turn && props.gameData.currentRound<6?
            <button onClick={goToGameACB} className="buttonPlay">Play</button> : null;
    }
    function renderBackButton(){
        //render the back button centered on the page or not depending on if also the start button will be rendered
        return props.playerData.username === props.gameData.turn && props.gameData.currentRound<6?
            <button onClick={goBackACB} className="buttonBack">Back</button>:
            <button id="centerButton" onClick={goBackACB} className="buttonBack">Back</button>
    }
    function goToGameACB(){
        props.onClickGame()
    }
    function goBackACB(){
        props.onClickHome()
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