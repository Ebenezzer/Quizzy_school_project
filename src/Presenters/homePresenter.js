import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";

export default
function Home(props){
 return <div>
    <HomeView/>
    <GameList getGamesFromModel = {props.model.games}/>
    </div>
}
