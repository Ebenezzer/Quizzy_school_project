import "./leaderboardView.css"
import leaderboard from "../../Assets/Images/leaderboard.png";
import goldMedal from "../../Assets/Images/gold_medal.png";
import silverMedal from "../../Assets/Images/silver_medal.png";
import bronzeMedal from "../../Assets/Images/bronze_medal.png";
import star from "../../Assets/Images/star (1).png";


function LeaderboardView(props) {
    function renderFirstPlayer(player) {
        return <div className="podium-card" key={Math.random().toString()}>
            <img className="player-icon" src={goldMedal}></img>
            <figcaption>{player.username}<br></br>
            Games won:{player.score} </figcaption>
        </div>
    }

    function renderSecondPlayer(player) {
        return <div className="podium-card" key={Math.random().toString()}>
            <img className="player-icon" src={silverMedal}></img>
            <figcaption>{player.username}<br></br>
            Games won:{player.score} </figcaption>
        </div>
    }

    function renderThirdPlayer(player) {
        return <div className="podium-card" key={Math.random().toString()}>
            <img className="player-icon" src={bronzeMedal}></img>
            <figcaption>{player.username}<br></br>
                Games won:{player.score} </figcaption>
        </div>
    }
    
    function renderLeaderboard(player) {
        return <div className="leaderboard-card" key={Math.random().toString()}>
            <div className="leaderboard-name">
            {props.players.indexOf(player)+1}. &nbsp;&nbsp;
                <img className="star" src={star}></img>
                <span>{player.username}</span>
            </div>
            <span> &emsp;{player.score} games won</span>
        </div>
    }

    function redirectACB(){
        props.onClickBackHome()
    }

    return (<div className="leaderboard-podium-box">
        <img src={leaderboard} className="leaderboard-image" />
        <div className="podium-box">
            {props.second_player.map(renderSecondPlayer)}
            {props.first_player.map(renderFirstPlayer)}
            {props.third_player.map(renderThirdPlayer)}
        </div>
        <div className="leaderboard-box">
            <h2 className="leaderboard-title">Leaderboard</h2>
            {props.players.map(renderLeaderboard)}
            <button onClick = {redirectACB} className="home-button">Home</button>
        </div>
    </div>

    )
}

export default LeaderboardView;