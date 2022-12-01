import React from "react";
import HomeView from "../Views/homeView/homeView";
import GameList from "../components/gameList/gameList";

export default
function Home(props){

 return <div>
    <HomeView/>
    <GameList getGamesFromModel = {[
        {
            gameId: 1,
            player1: 10,
            player2: 20,
            turn: 2,
            winner: undefined,
            currentRound: 10,
            score: {
            player1: 2,
            player2: 3,
            },
            result: {
            round1: [[true, false, false], [true, false, true]],
            round2: [undefined, [false, true, true]],
            round3: [undefined, undefined],
            round4: [undefined, undefined],
            round5: [undefined, undefined]
            }
            },
            {
                gameId: 2,
                player1: 10,
                player2: 20,
                turn: 3,
                winner: undefined,
                currentRound: 20,
                score: {
                player1: 2,
                player2: 3,
                },
                result: {
                round1: [[true, false, false], [true, false, true]],
                round2: [[false, true, true],undefined],
                round3: [undefined, undefined],
                round4: [undefined, undefined],
                round5: [undefined, undefined]
                }
            }
    ]}/>
    </div>
}
