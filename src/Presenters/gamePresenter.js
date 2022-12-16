import GameView from "../Views/gameView/gameView";
import React, { useState } from "react";
import promiseNoData from "../Views/promiseNoData/promiseNoData";
import { useNavigate } from 'react-router-dom';
import { shuffleArray } from "../helpFunctions";

export default
function Game(props){
    const navigate = useNavigate();
    const [questionsPromiseStatePromise, setquestionsPromiseStatePromise] = useState(props.model.questionsPromiseState.promise);
    const [questionsPromiseStateData, setquestionsPromiseStateData] = useState(props.model.questionsPromiseState.data);
    const [questionsPromiseStateError, setquestionsPromiseStateError] = useState(props.model.questionsPromiseState.error);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [roundArray, setRoundArray] = useState([]);
    const [answers, setAnswers] = useState()

    function observerACB(){
        setquestionsPromiseStatePromise(props.model.questionsPromiseState.promise);
        setquestionsPromiseStateData(props.model.questionsPromiseState.data);
        setquestionsPromiseStateError(props.model.questionsPromiseState.error);
        setRoundArray([])
        setCurrentAnswer(null)
        setCurrentQuestionIndex(0);
    }
    
    function updateRoundArrayACB(currentAnswer){
        if (currentAnswer === questionsPromiseStateData[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=>[...roundArray, true])
        }
        if (currentAnswer !== questionsPromiseStateData[currentQuestionIndex].correctAnswer){
            setRoundArray((roundArray)=>[...roundArray, false])
        }
    }

    function updateQuestionACB(){
        if (currentQuestionIndex<questionsPromiseStateData.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentAnswer(null);
            setAnswers(null)
        }
        else{
            navigate("/gameResults")
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

    if(!currentAnswer && !answers && questionsPromiseStateData){
        setAnswers(shuffleArray([questionsPromiseStateData[currentQuestionIndex].correctAnswer, ...questionsPromiseStateData[currentQuestionIndex].incorrectAnswers]));
    }

    return (<div className="wrapper">
        {promiseNoData({promise: questionsPromiseStatePromise, data:questionsPromiseStateData, error: questionsPromiseStateError})
        || <GameView question={questionsPromiseStateData[currentQuestionIndex]}
            currentAnswer={currentAnswer}
            correctAnswer={questionsPromiseStateData[currentQuestionIndex].correctAnswer}
            enabledAnswer={currentAnswer ? "disabledAnswer" : "enabledAnswer"}
            enabledQuestion={currentAnswer ? "enabledQuestion": "disabledQuestion"}
            currentQuestion={currentQuestionIndex+1}
            onUpdateQuestion={updateQuestionACB}
            onUpdateRoundArrayACB={updateRoundArrayACB}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}
            answers={answers}/>}
    </div>)
}