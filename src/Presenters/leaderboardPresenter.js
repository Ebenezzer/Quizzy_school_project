import React from "react";
import LeaderboardView from "../Views/leaderboardView/leaderboardView";
import { getScoresFirebase } from "../firebase/firebaseModel";
import { useNavigate } from 'react-router-dom'


export default
function Leaderboard(props){
    
    const navigate = useNavigate();

    const [players, setLeaderboardPlayers] = React.useState(props.model.players) 
    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        return function isTakenDownACB() {
            props.model.removeObserver(observerACB)
        };
    }
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setLeaderboardPlayers(props.model.players)
    }

    function compareScores(a, b) {
        if(a.score < b.score) {
            return 1;
        }
        if(a.score > b.score) {
            return -1;
        }
            return 0;
    }

    function redirectHome(){
        navigate('/home')
    }
    if (players){
 return <div>
    <LeaderboardView first_player = {players.sort(compareScores).slice(0,1)}
    second_player = {players.sort(compareScores).slice(1,2)}
    third_player = {players.sort(compareScores).slice(2,3)}
    players = {players.sort(compareScores)}
    onClickBackHome = {redirectHome}
    />
    </div>
}
else {console.log(players)}
}
