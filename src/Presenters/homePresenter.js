import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";

export default
function Home(props){

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)
    const [,dataFromGames] = React.useState(props.model.games)
    const [,setData] = React.useState(props.model.currentGamePromiseState.data)


    function wasCreatedACB(){           // 1. the component has been created
        props.model.addObserver(observerACB);      
        return function isTakenDownACB(){
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []); 

    function observerACB(){   
        setUserLogin(props.model.currentUser)
        dataFromGames(props.model.games)
        setData(props.model.currentGamePromiseState.data)
        }

    function initiateGameACB(){
       return props.model.addGame(props.model.currentGamePromiseState.data) 
       // i need to send in some sort of game object(containing a game id) or game ID
        //otherwise add game function in model won't be able to do it's comparison ?
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
    function getInactiveGames(object)
    {
     return object.winner;
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
            winner: null
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
        return <NoUserView/>
    }
    else { 
    return <div>
    <HomeView onNewGame = {initiateGameACB}/>
    <GameList currentGame = {currentGames.filter(getActiveGames).filter(getMyGamesCB)} turn = {"Your turn"} />
    <GameList currentGame = {currentGames.filter(getActiveGames).filter(getOpponentsGamesCB)} turn = {"Opponent's turn"}/>
    <GameList currentGame = {currentGames.filter(getInactiveGames)}turn = {"Finished games"}/>
    </div>
    }
}
