import { NavLink } from 'react-router-dom'
import './loginView.css';

function LoginView(props){

    function clickLogInACB(){
        if(props.currentUser === undefined || props.currentUser !== null){
            console.log("user logged in already")
        }
        props.onLogin()
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

        <label htmlFor = "username"><b>Username</b></label>
        <input type = {"username"} placeholder = "enter your username" onChange = {setUsernameACB} name="username" id = "username" required></input>

        <label htmlFor = "email"><b>Email</b></label>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>

        <label htmlFor = "password"><b>Password</b></label>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" required></input>

        <button onClick = {clickLogInACB} id="addBtn">Log In</button>
        <p className= "text-sm text-white text-center">No account yet? {''} <NavLink to = "/signup">Sign up</NavLink></p>
        {/*is it okay to use navlink in the view file*/}

        </div>
}

export default LoginView;