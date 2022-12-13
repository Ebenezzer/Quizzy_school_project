import "./leaderboardView.css"

function LeaderboardView(props){
    function renderLeaderboard(player){
        return <tr> 
            <td>{player.username}</td> 
            <td>{player.score}</td>
        </tr>
    }
    return( <div className = "leaderboard-background">
    <table>
        <tbody>
            {props.players.map(renderLeaderboard)}
        </tbody>
    </table>
    </div>
    )

}

export default LeaderboardView;