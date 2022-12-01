

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

    return <div>
        <input type = {"email"} placeholder = "enter your email" onChange = {setEmailACB}></input>
        <input type = {"password"} placeholder = "enter your password" onChange = {setPasswordACB}></input>

        <button onClick = {clickLogInACB}>Log In</button>
        <button onClick={clickCreateAccountACB}>Create Account</button>
    </div>
}

export default LoginView;