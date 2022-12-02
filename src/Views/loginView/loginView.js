import './loginView.css';

function LoginView(props){

    function clickLogInACB(){
        props.onLogin()
    }

    function clickCreateAccountACB(){
        props.onCreateAccount()
    }

    function setEmailACB(email){
        props.sendEmail(email.target.value)
    }
     
    function setPasswordACB(password){
        props.sendPassword(password.target.value)
    }

    return <div className = "container">
        <label for = "email"><b>Email</b></label>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" required></input>

        <label for = "password"><b>Password</b></label>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" required></input>

        <button onClick = {clickLogInACB}>Log In</button>
        <button onClick={clickCreateAccountACB}>Create Account</button>
    </div>
}

export default LoginView;