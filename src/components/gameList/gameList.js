import "./gameList.css"

export default
function GameList(props){ 
    function renderGameDetails(games){
        function doOnClick(){
            window.location.hash = "gameResults"
        }
            return (
                <div className="game-list" onClick={doOnClick}> 
                    <img className="player-icon" src="https://cdn4.iconfinder.com/data/icons/symbols-vol-1-1/40/user-person-single-id-account-player-male-female-512.png"></img>
                    <p>{games.player1}</p>
                    <p className="vs-span"> VS </p>
                    <p>{games.player2}</p>
                    <img className="player-icon" src="https://cdn4.iconfinder.com/data/icons/symbols-vol-1-1/40/user-person-single-id-account-player-male-female-512.png"></img>
                </div>
            )
        }

    return(
        <div className="box">
            {props.turn}
            {props.currentGame.map(renderGameDetails)}    
        </div>
    )
}