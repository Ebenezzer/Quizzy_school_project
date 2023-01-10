import React from 'react'
import "./sidebarView.css"
import {AiOutlineClose, AiOutlineHome} from 'react-icons/ai'
import {MdOutlineLeaderboard, MdOutlineQuiz} from 'react-icons/md'
import {RxHamburgerMenu} from 'react-icons/rx'
import { signingOut } from '../../firebase/firebaseModel'
import { Outlet} from 'react-router'


export default function SidebarView(props) {
    function redirectHomeACB() {
        props.onRedirectHome();
        props.onDeactivateSidebar();
    }
    
    function redirectLoginACB() {
        props.onDeactivateSidebar();
    }

    function redirectLeaderboardACB() {
        props.onRedirectLeaderboard();
        props.onDeactivateSidebar();
    }

    function activateSidebarACB(){
        props.onActivateSidebar();
    }

    function deactivateSidebarACB(){
        props.onDeactivateSidebar();
    }

    return (
        <div>
            <div id='hamburgerButton' onClick={activateSidebarACB}>
                <RxHamburgerMenu/>
            </div>
            <div id='sidebar' className={props.showSidebarClass}>
                <div id='exitAndLogo'>
                    <AiOutlineClose onClick={deactivateSidebarACB} id="exit"/>
                </div>
                <div id='home' className='sidebarContent' onClick={redirectHomeACB}><AiOutlineHome/>Home</div>
                {/* <div id='play' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><MdOutlineQuiz/>Play</div>
                <div id='practice' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><BiBrain/>Practice</div> */}
                <div id='leaderboard' className='sidebarContent' onClick={redirectLeaderboardACB}><MdOutlineLeaderboard/>Leaderboard</div>
                <div id='signout' onClick={()=>{signingOut(redirectLoginACB)}}>Sign Out</div>
            </div>
            <Outlet/> {/* all the children to Sidebar should be rendered here*/}
        </div>
    )
}
