import "./gameList.css"

export default
function GameList(props){ 
    function renderGameDetails(games){
            return (
                <div className="game-list"> 
                <tr>
                    <td>{games.player1}</td> 
                    <text> vs </text>
                    <td>{games.player2}</td>
                </tr>
                </div>
                )
        }

    return(
        <div className="box">
            <table>
                    <tbody>
                        {props.turn}
                        {props.currentGame.map(renderGameDetails)}
                    </tbody>
            </table>
            
        </div>
        
    )
}
