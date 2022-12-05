import "./homeView.css"

function HomeView(props){
    function newGameButtonOnClick(){
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
         <h1>Quizzy</h1>
         <button onClick={newGameButtonOnClick} className="new-game">New game</button>
         <button onClick={practiceButtonOnClick} className="new-game">Practice</button>
         <div className="popup-model" id="model">
        <div className="modal-content">
         <span className="close" onClick={closeModel}>&times;</span>
            <h2>New Game</h2>
            <label>Username</label> <br></br>
            <input type="text" id="username"></input>
            <button className="btn-invite" onClick={onInviteClick}>Invite</button>
         </div>
         </div>
         </div>
}

export default HomeView;