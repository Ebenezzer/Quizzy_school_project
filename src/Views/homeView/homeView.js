import "./homeView.css"
import quizzy_icon from "../../Assets/Images/q_icon.png";

function HomeView(props) {

    function newGameButtonOnClick() {
        var model = document.getElementById('model');
        model.style.display = 'block';
    }
    function closeModel() {
        var model = document.getElementById('model');
        model.style.display = 'none';
    }

    function onInviteACB() {
        var username = document.getElementById('username').value;
        props.onNewGame(username);
    }


    return <div>
        <img src={quizzy_icon} className="logo" />
        <p className="quizzy-name">Quizzy</p>
        <button onClick={newGameButtonOnClick} className="new-game">New game</button>
        <div className="popup-model" id="model">
            <form className="modal-content" onSubmit={onInviteACB}>
                <span className="close" onClick={closeModel}>&times;</span>
                <br></br>
                <h2>New Game</h2>
                <label>Invite friend</label> <br></br>
                <input type="text" id="username" className="input-name" placeholder="Username"></input>
                <div id="btn-incvite-wrapper">
                    <button className="btn-invite" type="submit">Invite</button>
                </div>
            </form>
        </div>
    </div>
}

export default HomeView;