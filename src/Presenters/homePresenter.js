import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";

export default
function Home(props){

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)


    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 
    
    function observerACB(){   
        setUserLogin(props.model.currentUser)
        }

    function getMyGamesCB(object)
    { 
        return object.currentRound === "username1"; 
    }

    function getOpponentsGamesCB(object)
    { 
        return object.currentRound !== "username1";
    }

    function getActiveGames(object)
    {
     return !object.winner;
    }

    const currentGames = [
        {
            player1: "username1",
            player2: "username2",
            currentRound: "username1",
            winner: null
        },
        {
            player1: "username1",
            player2: "username2",
            currentRound: "username2",
            winner: "username2"
        },
        {
            player1: "username1",
            player2: "username6",
            currentRound: "username6",
            winner: null
        },
        {
            player1: "username5",
            player2: "username1",
            currentRound: "username1",
            winner: "username1"
        }

    ]
     
    if(!userLoggedIn){
        //return <NoUserView/>
    }
    else{ return <div>
    <HomeView/>
    <GameList currentGame = {currentGames.filter(getActiveGames).filter(getMyGamesCB)} turn = {"Your turn"}/>
    <GameList currentGame = {currentGames.filter(getActiveGames).filter(getOpponentsGamesCB)} turn = {"Opponent's turn"}/>
    </div>
    }
}
