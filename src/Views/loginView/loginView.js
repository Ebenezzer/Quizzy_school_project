import { NavLink } from 'react-router-dom'
import './loginView.css';

function LoginView(props){

    function clickLogInACB(){
        props.onLogin()
    }

    function setEmailACB(email){
        props.sendEmail(email.target.value)
    }
     
    function setPasswordACB(password){
        props.sendPassword(password.target.value)
    }

    function showPasswordACB(){
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        }
        else {
            x.type = "password";
        }
    }

    return <div className = "container">
            <div id='contentCard'>

                <label htmlFor = "email"><b>Email</b></label>
                <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>

                <label htmlFor = "password"><b>Password</b></label>
                <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" id = "password" required></input>
                <input type="checkbox" onClick= {showPasswordACB}/>Show Password
                <span id="error"></span>

                <button onClick = {clickLogInACB} id="addBtn">Log In</button>
                <p className= "text-sm text-white text-center">No account yet?<NavLink to = "/signup">Sign up</NavLink></p>
            </div>
        </div>
}

export default LoginView;