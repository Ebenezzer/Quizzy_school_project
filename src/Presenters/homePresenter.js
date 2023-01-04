import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";
import NoUserView from "../Views/noUserView";
import { useNavigate } from 'react-router-dom'
import { db } from "../firebase/firebaseModel";

import { ref} from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';

export default
    function Home(props) {
    const navigate = useNavigate();

    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser)
    var games = []

    const [snapshots, loading, error] = useList(ref(db,"quizzy11" + '/games'));

    if(!loading && snapshots){
        function makeListCB(snapshot){
            return snapshot.val()
        }
        function findUserGamesCB(game){
            return game.player1==props.model.user.username || game.player2==props.model.user.username 
        }
        games = snapshots.map(makeListCB).filter(findUserGamesCB)
    }
    
    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        return function isTakenDownACB() {
            props.model.removeObserver(observerACB)
        };
    }
    React.useEffect(wasCreatedACB, []);

    function observerACB() {
        setUserLogin(props.model.currentUser)

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
        //props.model.updateCurrentOpponent()
        props.model.setCurrentOpponentTest()
        
        navigate("/gameResults");
    } 
    if (!userLoggedIn) {
        return <NoUserView />
    }
    else {
        return <div>
            <HomeView onNewGame={initiateGameACB} />
            <GameList currentGame={games.filter(getActiveGames).filter(getMyGamesCB)} turn={"Your turn"} 
            goToGameACB={gameButtonACB}/>
            <GameList currentGame={games.filter(getActiveGames).filter(getOpponentsGamesCB)} turn={"Opponent's turn"} 
            goToGameACB={gameButtonACB}/>
            <GameList currentGame={games.filter(getInactiveGames)} turn={"Finished games"} 
            goToGameACB={gameButtonACB}/>
        </div>
    }
}