import React from "react";
import { NavLink } from "react-router-dom";


function NoUserView(props){
    return <div>
        <p> You're not logged in!</p>

        <NavLink to = "/login">Login</NavLink>
        <br></br>
        <NavLink to = "/signup">Sign up</NavLink>
    </div>
}

export default NoUserView;