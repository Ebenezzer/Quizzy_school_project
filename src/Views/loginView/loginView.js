import './loginView.css';

function LoginView(props){

    function clickLogInACB(){
        props.onLogin()
        window.location.hash = "#home";
    }

    function clickCreateAccountACB(){
        props.onCreateAccount()
        window.location.hash = "#home";
    }

    function clickSignOutACB(){
        props.onSignOut()
    }

    function setEmailACB(email){
        props.sendEmail(email.target.value)
    }
     
    function setPasswordACB(password){
        props.sendPassword(password.target.value)
    }

    function setUsernameACB(username){
        props.sendUsername(username.target.value)
    }



    return <div className = "container">

        <label for = "username"><b>Username</b></label>
        <input type = {"username"} placeholder = "enter your username" onChange = {setUsernameACB} name="username" id = "username" required></input>

        <label for = "email"><b>Email</b></label>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>

        <label for = "password"><b>Password</b></label>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" required></input>

        <button onClick = {clickLogInACB} id="addBtn">Log In</button>
        <button onClick={clickCreateAccountACB} id="addBtn">Create Account</button>
        <button onClick = {clickSignOutACB}>Sign out</button>
    </div>
}

export default LoginView;