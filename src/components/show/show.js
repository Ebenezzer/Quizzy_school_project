import React from 'react';
import './show.css'

export default
function Show(props){
    const [hashState, setHash]= React.useState(window.location.hash);	//  copy the value in component state	
    function hashListenerACB(){ setHash(window.location.hash); } // when notified, update state with current value
    function componentWasCreatedACB(){   //   1. the component has been created
       window.addEventListener("hashchange", hashListenerACB);    // subscribe, see previous slide
       function isTakenDownACB(){          //  2. the component is being taken down        
           window.removeEventListener("hashchange", hashListenerACB)
       }
       return isTakenDownACB; 
    }
    React.useEffect( componentWasCreatedACB, [] );  // empty array!
    return <div className={hashState===props.hash?"":"hidden"}>{props.children}</div>;
}
