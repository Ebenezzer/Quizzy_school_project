import GameView from "../Views/gameView/gameView";
import React, { useState } from "react";
import promiseNoData from "../Views/promiseNoData/promiseNoData";
import { shuffleArray } from "../helpFunctions";

export default
function Game(props){
    const [questionsPromiseStatePromise, setquestionsPromiseStatePromise] = useState(props.model.questionsPromiseState.promise);
    const [questionsPromiseStateData, setquestionsPromiseStateData] = useState(props.model.questionsPromiseState.data);
    const [questionsPromiseStateError, setquestionsPromiseStateError] = useState(props.model.questionsPromiseState.error);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState();
    const [roundArray, setRoundArray] = useState([]);

    function observerACB(){
        setquestionsPromiseStatePromise(props.model.questionsPromiseState.promise);
        setquestionsPromiseStateData(props.model.questionsPromiseState.data);
        setquestionsPromiseStateError(props.model.questionsPromiseState.error);
        setRoundArray([])
        setCurrentQuestionIndex(0);
        setCurrentAnswer(null)
    }
    
    function updateRoundArrayACB(currentAnswer){
        if (currentAnswer === props.model.questions[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=>[...roundArray, true])
        }
        if (currentAnswer !== props.model.questions[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=>[...roundArray, false])
        }
    }

    function updateQuestionACB(){
        if (currentQuestionIndex<questionsPromiseStateData.length-1){
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

    function componentWasCreatedACB(){   //   1. the component has been created
        props.model.addObserver(observerACB)
        return function isTakenDownACB(){props.model.removeObserver(observerACB)}
    }   
    React.useEffect( componentWasCreatedACB, [] );

    return (<div className="wrapper">
        {promiseNoData({promise: questionsPromiseStatePromise, data:questionsPromiseStateData, error: questionsPromiseStateError})
        || <GameView question={questionsPromiseStateData[currentQuestionIndex]}
        model={props.model}
        currentAnswer={currentAnswer}
        correctAnswer={questionsPromiseStateData[currentQuestionIndex].correctAnswer}
        enabledAnswer={currentAnswer ? "enabledAnswer" : "disabledAnswer"}
        enabledQuestion={currentAnswer ? "disabledQuestion" : "enabledQuestion"}
        currentQuestionIndex = {currentQuestionIndex+1}
        onUpdateQuestion={updateQuestionACB}
        onUpdateRoundArrayACB={updateRoundArrayACB}
        onUpdateCurrentAnswer={updateCurrentAnswerACB}
        answers={[questionsPromiseStateData[currentQuestionIndex].correctAnswer, ...questionsPromiseStateData[currentQuestionIndex].incorrectAnswers]}/>}
    </div>)
}