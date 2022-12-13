import React, { useState } from 'react'
import "./sidebarView.css"
import {AiOutlineClose} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import { signingOut } from '../../firebase/firebaseModel'
import { getAuth } from 'firebase/auth'
import { app } from '../../firebase/firebaseModel'

const auth = getAuth(app)

export default function SidebarView() {
    const [showSidebar, setShowSidebar] = useState(false);
    const showSidebarClass = showSidebar ? "showSidebar" : "hideSidebar"; 



    return (
        <div>
            <div id='hamburgerButton' onClick={()=>{setShowSidebar(true)}}>
                <GiHamburgerMenu/>
            </div>
            <div id='sidebar' className={showSidebarClass}>
                <div id="gridParent">
                    <div id='exitAndLogo' className='sidebarContent'>
                        <AiOutlineClose onClick={()=>setShowSidebar(false)}/>
                    </div>
                    <div id='home' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}>Home</div>
                    <div id='play' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}>Play</div>
                    <div id='practice' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}>Practice</div>
                    <div id='leaderboard' className='sidebarContent' onClick={()=>{window.location.hash="#home"; setShowSidebar(false)}}>Leaderboard</div>
                    <div id='signout' className='sidebarContent' onClick={()=>{window.location.hash="#login"; signingOut(auth); setShowSidebar(false)}}>Sign Out</div>
                </div>
            </div>
        </div>
    )
}
