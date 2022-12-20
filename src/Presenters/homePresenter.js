import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";
import { useNavigate } from 'react-router-dom'

export default

    function Home(props) {
    const navigate = useNavigate();

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser) // check that user logged in before showcase (props.model.loggedIn if others wish to reach it)
    const [games, dataFromGames] = React.useState(props.model.games)

    function wasCreatedACB() {           // 1. the component has been created
        props.model.addObserver(observerACB);
        return function isTakenDownACB() {
            props.model.removeObserver(observerACB)
        };  // 2. the component is being taken down 
    }
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setUserLogin(props.model.currentUser)
        dataFromGames(props.model.games)
    }

    function initiateGameACB(username) {
        //props.model.addGame(addGamestoFirebase(props.model.currentUser))
        //props.model.setCurrentGame(addGamestoFirebase(props.model.currentUser))
        props.model.createNewGame(username)
        navigate('/gameResults')
        // i need to send in some sort of game object(containing a game id) or game ID
        //otherwise add game function in model won't be able to do it's comparison ?
    }

    function getMyGamesCB(object) {
        return object.turn === props.model.user.username;
    }

    function getOpponentsGamesCB(object) {
        return object.turn !== props.model.user.username;
    }

    function getActiveGames(object) {
        return !object.winner;
    }
    function getInactiveGames(object) {
        return object.winner;
    }
    function gameButtonACB(game) {
        props.model.setCurrentGame(game)
        navigate("/gameResults");
    }
    if (!userLoggedIn) {
        return <NoUserView />
    }
    else {
        return <div>
            <HomeView onNewGame={initiateGameACB} />
            <GameList currentGame={games.filter(getActiveGames).filter(getMyGamesCB)} turn={"Your turn"} goToGameACB={gameButtonACB} />
            <GameList currentGame={games.filter(getActiveGames).filter(getOpponentsGamesCB)} turn={"Opponent's turn"} goToGameACB={gameButtonACB} />
            <GameList currentGame={games.filter(getInactiveGames)} turn={"Finished games"} goToGameACB={gameButtonACB} />
        </div>
    }
}
