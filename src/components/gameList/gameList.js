import "./gameList.css"

export default
    function GameList(props) {
        function renderGameDetails(games) {
            function setCurrentGameACB() {
                props.goToGameACB(games)
            }
        return (
            <div className="game-list" onClick={setCurrentGameACB} key={Math.random().toString()}>
                <p>{games.player1}</p>
                <p className="vs-span"> VS </p>
                <p>{games.player2}</p>
            </div>
            )
        }
    return (
        <div className="box">
            <h3 className="turn-header">{props.turn}</h3>
            {props.currentGame.map(renderGameDetails)}
        </div>
    )
}