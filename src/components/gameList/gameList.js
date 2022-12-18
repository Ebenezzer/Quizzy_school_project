import "./gameList.css"

export default
function GameList(props){ 
    function renderGameDetails(games){
            return (
                <div className="game-list" onClick={props.goToGame} key = {Math.random().toString()}> 
                    <img className="player-icon" src="https://cdn-icons-png.flaticon.com/512/706/706830.png"></img>
                    <p>{games.info.player1}</p>
                    <p className="vs-span"> VS </p>
                    <p>{games.info.player2}</p>
                    <img className="player-icon" src="https://cdn-icons-png.flaticon.com/512/4128/4128176.png"></img>
                </div>
            )
        }

    return(
        <div className="box">
            <h3 className="turn-header">{props.turn}</h3>
            {props.currentGame.map(renderGameDetails)}    
        </div>
    )
}