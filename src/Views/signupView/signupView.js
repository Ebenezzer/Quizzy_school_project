import './signupView.css';
import { NavLink } from 'react-router-dom'

// password visibility resource: www.w3schools.com/howto/howto_js_toggle_password.asp?utm_source=pocket_saves


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
                <label htmlFor = "username"><b>Username</b></label>
                <input type = {"username"} placeholder = "enter your username" onChange = {setUsernameACB} name="username" id = "username" required></input>
                <div className = "errUsername" id = "errUsername"></div>

                <label htmlFor = "email"><b>Email</b></label>
                <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB} name="email" id = "email" required></input>
                <div id = "errEmail"></div>

                <label htmlFor = "password"><b>Password</b></label>
                <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB} name="password" id = "password" required></input>
                <div id = "errPassword"></div>
                <input type="checkbox" onClick= {showPasswordACB}/>Show Password

                <button onClick={clickCreateAccountACB} id="addBtn">Sign Up</button>
                <p className= "text-sm text-white text-center">Already have an account?<NavLink to = "/login">Login</NavLink></p>
            </div>
        </div>
}

export default SignupView;