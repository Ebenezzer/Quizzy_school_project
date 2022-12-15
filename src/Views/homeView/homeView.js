import "./homeView.css"
import quizzy_icon from "../../Assets/Images/quizzy_icon.png";

function HomeView(props){
    function newGameButtonOnClick(){
        props.onNewGame()
        var model = document.getElementById('model');
        model.style.display = 'block';
    }
    function closeModel(){
        var model = document.getElementById('model');
        model.style.display = 'none';
    }

    function onInviteClick(){
        var username = document.getElementById('username').value;
        console.log("Invite sent to: " + username);
    }

    function practiceButtonOnClick(){
        window.location.hash = "category"
    }
    
    return <div>
         <img className= "logo" src={quizzy_icon}/>
         <h1>Quizzy</h1>
         <button onClick={newGameButtonOnClick} className="new-game">New game</button>
         <button onClick={practiceButtonOnClick} className="new-game">Practice</button>
         <div className="popup-model" id="model">
        <div className="modal-content">
         <span className="close" onClick={closeModel}>&times;</span>
            <br></br>
            <h2>New Game</h2>
            <label>Invite friend</label> <br></br>
            <input type="text" id="username" className="input-name" placeholder="Username"></input>
            <br></br>
            <button className="btn-invite" onClick={onInviteClick}>Invite</button>
         </div>
         </div>
         </div>
}

export default HomeView;