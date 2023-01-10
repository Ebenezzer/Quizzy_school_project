import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SidebarView from '../Views/sidebarView/sidebarView'
import { getScoresFirebase } from '../firebase/firebaseModel';
import NoUserView from '../Views/noUserView';
export default function Sidebar(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarClass = showSidebar ? "showSidebar" : "hideSidebar"; 

    const navigate = useNavigate();

    function redirecthomeACB(){
        navigate ("/home")
    }
    function redirectLeaderboardACB(){
        getScoresFirebase(props.model)
        navigate ("/leaderboard")
    }
    function activateSidebarACB(){
        setShowSidebar(true)
    }
    function deactivateSidebarACB(){
        setShowSidebar(false)
    }
    
    return (
        <div>
            <SidebarView onRedirectHome={redirecthomeACB}
            onRedirectLeaderboard={redirectLeaderboardACB}
            showSidebarClass={showSidebarClass}
            onActivateSidebar={activateSidebarACB}
            onDeactivateSidebar={deactivateSidebarACB}/>
        </div>
    )
}
