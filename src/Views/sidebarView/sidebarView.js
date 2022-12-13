import React, { useState } from 'react'
import "./sidebarView.css"
import {AiOutlineClose, AiOutlineHome} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdOutlineLeaderboard, MdOutlineQuiz} from 'react-icons/md'
import {BiBrain} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'


export default function SidebarView() {
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarClass = showSidebar ? "showSidebar" : "hideSidebar"; 



    return (
        <div>
            <div id='hamburgerButton' onClick={()=>{setShowSidebar(true)}}>
                <RxHamburgerMenu/>
            </div>
            <div id='sidebar' className={showSidebarClass}>
                <div id='exitAndLogo' className='sidebarContent'>
                    <AiOutlineClose onClick={()=>setShowSidebar(false)}/>
                </div>
                <div id='home' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><AiOutlineHome/>Home</div>
                <div id='play' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><MdOutlineQuiz/>Play</div>
                <div id='practice' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><BiBrain/>Practice</div>
                <div id='leaderboard' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}><MdOutlineLeaderboard/>Leaderboard</div>
            </div>
        </div>
    )
}
