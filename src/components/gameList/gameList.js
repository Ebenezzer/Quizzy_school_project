import "./gameList.css"

export default
function GameList(props){ 
    function renderGameDetails(games){
        return (
        <tr> 
            <td>{games.player1}</td> 
            <td>{games.player2}</td>
        </tr>
        )
    }
    return(
        <div className="box">
            <table>
                    <tbody>
                    {props.getGamesFromModel.map(renderGameDetails)}
                    </tbody>
                </table>
            
        </div>
    )
}
