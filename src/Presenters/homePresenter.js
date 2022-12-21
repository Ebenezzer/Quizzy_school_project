import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";
import { useNavigate } from 'react-router-dom'

export default
    function Home(props) {
    const navigate = useNavigate();

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser)
    const [games, dataFromGames] = React.useState(props.model.games)

    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        return function isTakenDownACB() {
            props.model.removeObserver(observerACB)
        };
    }
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setUserLogin(props.model.currentUser)
        dataFromGames(props.model.games)
    }

    function initiateGameACB(username) {
        props.model.createNewGame(username)
        navigate('/gameResults')
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
        props.model.updateCurrentOpponent()  //TODO test if it works
        
        navigate("/gameResults");
    } 
    if (!userLoggedIn) {
        return <NoUserView />
    }
    else {
        //setTimeout(() => {window.location.reload();}, 3000);
        props.model.getGameList()
        console.log(props.model.games)
        return <div>
            <HomeView onNewGame={initiateGameACB} />
            <GameList currentGame={games.filter(getActiveGames).filter(getMyGamesCB)} turn={"Your turn"} goToGameACB={gameButtonACB} />
            <GameList currentGame={games.filter(getActiveGames).filter(getOpponentsGamesCB)} turn={"Opponent's turn"} goToGameACB={gameButtonACB} />
            <GameList currentGame={games.filter(getInactiveGames)} turn={"Finished games"} goToGameACB={gameButtonACB} />
        </div>
    }
}