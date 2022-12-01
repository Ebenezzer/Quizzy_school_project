

function loginView(props){

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

    return <div className = "">
        <input placeholder = "enter your email" onChange = {setEmailACB}> </input>
        <input placeholder = "enter your password" onChange = {setPasswordACB}> </input>

        <button onClick = {clickLogInACB}>Log In</button>
        <button onClick={clickCreateAccountACB}>Create Account</button>
    </div>
}

export default loginView;