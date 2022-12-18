import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";
import { addGamestoFirebase , updateUserScoreFirebase } from "../firebase/firebaseModel";
import { useNavigate } from 'react-router-dom'

export default
function Home(props){
    const navigate = useNavigate();

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)
    const [,dataFromGames] = React.useState(props.model.games)

    const [,setData] = React.useState(props.model.currentGamePromiseState.data)
    const [, promisePromise] = React.useState(props.model.currentGamePromiseState.promise);
    const [, setError] = React.useState(props.model.currentGamePromiseState.error)


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
        setError(props.model.currentGamePromiseState.error)
        promisePromise(props.model.currentGamePromiseState.promise)
        }

    function initiateGameACB(username){
       //props.model.addGame(addGamestoFirebase(props.model.currentUser))
       //props.model.setCurrentGame(addGamestoFirebase(props.model.currentUser))
       props.model.createNewGame(username)
       navigate('/gameResults')
       // i need to send in some sort of game object(containing a game id) or game ID
        //otherwise add game function in model won't be able to do it's comparison ?
    }
    
    function getMyGamesCB(object)
    { 
        return object.info.turn === props.model.currentUser; 
    }

    function getOpponentsGamesCB(object)
    { 
        return object.info.turn !== props.model.currentUser;
    }

    function getActiveGames(object)
    {
     return !object.info.winner;
    }
    function getInactiveGames(object)
    {
     return object.info.winner;
    }
    function practiceButtonACB(){
        navigate("/gameResults");
    }
    if(!userLoggedIn){
        return <NoUserView/>
    }
    else { 
    return <div>
    <HomeView onNewGame = {initiateGameACB} games = {props.model.games}/>
    <GameList currentGame = {props.model.games.filter(getActiveGames).filter(getMyGamesCB)} turn = {"Your turn"} goToGame = {practiceButtonACB}/>
    <GameList currentGame = {props.model.games.filter(getActiveGames).filter(getOpponentsGamesCB)} turn = {"Opponent's turn"} goToGame = {practiceButtonACB}/>
    <GameList currentGame = {props.model.games.filter(getInactiveGames)}turn = {"Finished games"} goToGame = {practiceButtonACB}/>
    </div>
    }
}
