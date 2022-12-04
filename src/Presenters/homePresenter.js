import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";

export default
function Home(props){
    function getMyGamesCB(object)
    { 
        return object.currentRound !== 10; 
    }

    function getOpponentsGamesCB(object)
    { 
        return object.currentRound === 10;
    }
    const currentGames = [
        {
            player1: 10,
            player2: 20,
            currentRound: 10,
        },
        {
            player1: 10,
            player2: 20,
            currentRound: 20,
        },
        {
            player1: 10,
            player2: 60,
            currentRound: 60,
        },
        {
            player1: 50,
            player2: 10,
            currentRound: 10,
        }

    ]
 return <div>
    <HomeView/>
    <GameList currentGame = {currentGames.filter(getMyGamesCB)} turn = {"Your turn"}/>
    <GameList currentGame = {currentGames.filter(getOpponentsGamesCB)} turn = {"Opponent's turn"}/>

    </div>
}
