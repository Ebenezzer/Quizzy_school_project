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
        },
        {
            username: "player5",
            score: 5
        },
        {
            username: "player6",
            score: 6
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
    <LeaderboardView first_player = {currentPlayers.sort(compareScores).slice(0,1)}
    second_player = {currentPlayers.sort(compareScores).slice(1,2)}
    third_player = {currentPlayers.sort(compareScores).slice(2,3)}
    players = {currentPlayers.sort(compareScores).slice(3,)}/>
    </div>
}
