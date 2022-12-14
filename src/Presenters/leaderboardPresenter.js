import React from "react";
import LeaderboardView from "../Views/leaderboardView/leaderboardView";

export default
function Leaderboard(props){
    const currentPlayers = [
        {
            username: "player4",
            score: 4
        },
        {
            username: "player2",
            score: 2
        },
        {
            username: "player3",
            score: 3
        },
        {
            username: "player1",
            score: 1
        }
    ]
    function compareScores(a, b) {
        if(a.score < b.score) {
            return 1;
        }
        if(a.score > b.score) {
            return -1;
        }
            return 0;
    }

 return <div>
    <LeaderboardView players = {currentPlayers.sort(compareScores)}/>
    </div>
}
