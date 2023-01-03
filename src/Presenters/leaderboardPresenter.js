import React from "react";
import LeaderboardView from "../Views/leaderboardView/leaderboardView";
import { getScoresFirebase } from "../firebase/firebaseModel";
import { useNavigate } from 'react-router-dom'



export default
function Leaderboard(props){

    const navigate = useNavigate();

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
    getScoresFirebase(props.model)


 return <div>
    <LeaderboardView first_player = {props.model.players.sort(compareScores).slice(0,1)}
    second_player = {props.model.players.sort(compareScores).slice(1,2)}
    third_player = {props.model.players.sort(compareScores).slice(2,3)}
    players = {props.model.players.sort(compareScores)}
    onClickBackHome = {redirectHome}/>
    </div>
}
