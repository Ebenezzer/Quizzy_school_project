import GameView from "../Views/gameView/gameView";
import CategoryView from "../Views/categoryView/categoryView"
import React, { useState } from "react";
import promiseNoData from "../Views/promiseNoData/promiseNoData";
import resolvePromise from "../resolvePromise";
import {getQuestions} from "../questionSource"
import Show from "../components/show/show";
import { shuffleArray } from "../helpFunctions";

export default
function Game(props){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(props.currentAnswer);
    // const [answers, setAnswers] = useState();
    const [promiseState] = useState({});  // no setter --> fixed!
    const [, reRender] = useState();  // updates the component
    const roundArray = []

    function notifyACB(){reRender(new Object());}
    function findQuestionsACB(category){
        resolvePromise(getQuestions({limit: 3, categories: category}), promiseState, notifyACB);
        setCurrentAnswer(null)
        setCurrentQuestionIndex(0)
        window.location.hash = "#game"
    }
    
    function updateRoundArrayACB(currentAnswer){
        if (currentAnswer === props.model.questions[currentQuestionIndex].correctAnswer){
            roundArray = [...roundArray, true];
        }
        if (currentAnswer !== props.model.questions[currentQuestionIndex].correctAnswer){
            roundArray = [...roundArray, false];
        }
    }

    function updateQuestionACB(){
        if (currentQuestionIndex<promiseState.data.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentAnswer(null);
        }
        else{
            window.location.hash = "#gameResults";
            console.log(roundArray);
        }
    }

    function updateCurrentAnswerACB(answer) {
        setCurrentAnswer(answer)
    }

    return (<div>
        <Show hash="#category"><CategoryView model={props.model} onFindQuestions={findQuestionsACB}/></Show>
        <Show hash="#game">{promiseNoData(promiseState)
        || <GameView question={promiseState.data[currentQuestionIndex]} 
        model={props.model}
        currentAnswer={currentAnswer}
        correctAnswer={promiseState.data[currentQuestionIndex].correctAnswer}
        enabledAnswer={currentAnswer ? "enabledAnswer" : "disabledAnswer"}
        enabledQuestion={currentAnswer ? "disabledQuestion" : "enabledQuestion"}
        onUpdateQuestion={updateQuestionACB}
        onUpdateRoundArrayACB={updateRoundArrayACB}
        onUpdateCurrentAnswer={updateCurrentAnswerACB}
        answers={shuffleArray([promiseState.data[currentQuestionIndex].correctAnswer, ...promiseState.data[currentQuestionIndex].incorrectAnswers])}/>}</Show>
    </div>)
}