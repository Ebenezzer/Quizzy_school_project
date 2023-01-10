import React from "react";
import { useNavigate } from "react-router-dom";



function NoUserView(){
    const navigate = useNavigate();
    function navigateToSignupACB(){
        navigate("/signup");
    }

    function navigateToLoginACB(){
        navigate("/login");
    }

    return <div className="container">
        <div id="contentCard">
            <p> You're not logged in!</p>

            <button onClick={navigateToLoginACB} id="addBtn">Log In</button>
            <br></br>
            <button onClick={navigateToSignupACB} id="addBtn">Sign Up</button>
        </div>
    </div>
}

export default NoUserView;