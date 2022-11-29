import { getQuestions } from "../questionSource";
import resolvePromise from "../resolvePromise";
import React from "react";

export default
function Game(props){
    const [promiseState] = React.useState({});  // no setter --> fixed!
    const [, reRender] = React.useState();  // updates the component

    function notifyACB(){reRender(new Object());}
    function findQuestionsACB(){
        resolvePromise(getQuestions({limit: 3, categories: "history"}), promiseState, notifyACB)
    }
    return(
        <div>
            <button onClick={findQuestionsACB}>Click for questions</button>
            <div>{promiseState.data}</div>
        </div>
    );
}    
