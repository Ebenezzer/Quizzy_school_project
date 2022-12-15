import './signupView.css';
import { NavLink } from 'react-router-dom'


function SignupView(props){


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



    return <div className = "container">

        <label htmlFor = "username"><b>Username</b></label>
        <input type = {"username"} placeholder = "enter your username" onChange = {setUsernameACB} name="username" id = "username" required></input>

        <label htmlFor = "email"><b>Email</b></label>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>

        <label htmlFor = "password"><b>Password</b></label>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" required></input>

        <button onClick={clickCreateAccountACB} id="addBtn">Sign Up</button>
        <p className= "text-sm text-white text-center">Already have an account?<NavLink to = "/login">Login</NavLink></p>

        </div>
}

export default SignupView;