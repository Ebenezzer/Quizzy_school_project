import { getQuestions } from "../questionSource";
import resolvePromise from "../resolvePromise";
import GameView from "../Views/gameView/gameView";
import React from "react";
import promiseNoData from "../Views/promiseNoData/promiseNoData";
import CategoryView from "../Views/categoryView/categoryView";
import Show from "../components/show/show";

export default
function Game(props){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [roundArray, setRoundArray] = useState([])
    const [promiseState] = React.useState({});  // no setter --> fixed!
    const [, reRender] = React.useState();  // updates the component
    
    function notifyACB(){reRender(new Object());}
    function findQuestionsACB(category){
        resolvePromise(getQuestions({limit: 3, categories: category}), promiseState, notifyACB);
        window.location.hash = "#game"
    }

    function updateRoundArrayACB(currentAnswer){
        if (currentAnswer === props.questions[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=> [...roundArray, true])
        }
        if (currentAnswer !== props.questions[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=> [...roundArray, false])
        }
    }

    function updateQuestionACB(){
        if (currentQuestionIndex<props.questions.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }else{
            window.location.hash = "#gameResults";
            console.log(roundArray);
        }
    }

    return (<div>
        <Show hash="#category"><CategoryView model={props.model} onFindQuestions={findQuestionsACB}/></Show>
        <Show hash="#game">{promiseNoData(promiseState)
        || <GameView questions={promiseState.data} model={props.model}/>}</Show>
    </div>)
}