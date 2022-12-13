import { NavLink } from 'react-router-dom';
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

    function setUsernameACB(username){
        props.sendUsername(username.target.value)
    }



    return <form>
        <div className = "container">

        <label htmlFor = "username"><b>Username</b></label>
        <input type = {"username"} placeholder = "enter your username" onChange = {setUsernameACB} name="username" id = "username" required></input>

        <label htmlFor = "email"><b>Email</b></label>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>

        <label htmlFor = "password"><b>Password</b></label>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" required></input>

        <button onClick = {clickLogInACB} id="addBtn">Log In</button>
        <button onClick={clickCreateAccountACB} id="addBtn">Create Account</button>
        <p className= "text-sm text-white text-center">No accountt yet? {''} <NavLink to = "/signup">Sign up</NavLink></p>

        </div>
    </form>
}

export default LoginView;