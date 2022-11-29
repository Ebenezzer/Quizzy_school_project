import { getQuestions } from "../questionSource";
import resolvePromise from "../resolvePromise";
import GameView from "../Views/gameView/gameView";
import React from "react";
import promiseNoData from "../Views/promiseNoData";
import CategoryView from "../Views/categoryView/categoryView";

export default
function Game(){
    const [promiseState] = React.useState({});  // no setter --> fixed!
    const [, reRender] = React.useState();  // updates the component
    
    function notifyACB(){reRender(new Object());}
    function findQuestionsACB(category){
        resolvePromise(getQuestions({limit: 3, categories: category}), promiseState, notifyACB);
    }
    
    return (<div>
        <CategoryView onFindQuestions={findQuestionsACB}/>
        {console.log(promiseState.data)}
        {promiseNoData(promiseState)
        || <GameView questions={promiseState.data}/>}
    </div>)
}