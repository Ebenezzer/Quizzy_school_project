import { getQuestions } from "../questionSource";
import resolvePromise from "../resolvePromise";
import GameView from "../Views/gameview/gameView";
import React from "react";
import promiseNoData from "../Views/promiseNoData";
import CategoryView from "../Views/categoryView/categoryView";
import Show from "../components/show/show";

export default
function Game(){
    const [promiseState] = React.useState({});  // no setter --> fixed!
    const [, reRender] = React.useState();  // updates the component
    
    function notifyACB(){reRender(new Object());}
    function findQuestionsACB(category){
        resolvePromise(getQuestions({limit: 3, categories: category}), promiseState, notifyACB);
        window.location.hash = "#game"
    }
    
    return (<div>
        <Show hash="#category"><CategoryView onFindQuestions={findQuestionsACB}/></Show>
        <Show hash="#game">{promiseNoData(promiseState)
        || <GameView questions={promiseState.data}/>}</Show>
    </div>)
}