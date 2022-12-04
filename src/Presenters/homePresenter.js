import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";

export default
function Home(props){
    function getMyGamesCB(object)
    { 
        return object.currentRound !== "username1"; 
    }

    function getOpponentsGamesCB(object)
    { 
        return object.currentRound === "username1";
    }
    const currentGames = [
        {
            player1: "username1",
            player2: "username2",
            currentRound: "username1",
        },
        {
            player1: "username1",
            player2: "username2",
            currentRound: "username2",
        },
        {
            player1: "username1",
            player2: "username6",
            currentRound: "username6",
        },
        {
            player1: "username5",
            player2: "username1",
            currentRound: "username1",
        }

    ]
 return <div>
    <HomeView/>
    <GameList currentGame = {currentGames.filter(getMyGamesCB)} turn = {"Your turn"}/>
    <GameList currentGame = {currentGames.filter(getOpponentsGamesCB)} turn = {"Opponent's turn"}/>

    </div>
}
