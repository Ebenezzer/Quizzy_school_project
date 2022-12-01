import "./gameList.css"

export default
function GameList(props){ 
    function getMyGamesCB(object)
    { 
        return object.currentRound !== 10; 
    }

    function getOpponentsGamesCB(object)
    { 
        return object.currentRound === 10;
    }

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

    function displayMyGamesCB(){
        return props.getGamesFromModel.filter(getOpponentsGamesCB)
     }
 
     function displayOpponentsGamesCB(){
         return props.getGamesFromModel.filter(getMyGamesCB)
      }

    return(
        <div className="box">
            <table>
                    <tbody>
                    {displayMyGamesCB.map(renderGameDetails)}
                    </tbody>
            </table>
            
        </div>
    )
}
