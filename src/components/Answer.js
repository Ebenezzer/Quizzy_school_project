import React, { useState } from 'react'
import 'animate.css';

export default function Answer(props) {

    const [currentAnswer, setCurrentAnswer] = useState(props.currentAnswer);
    const answer = props.answer;
    const isCorrect = currentAnswer && answer === props.correctAnswer;
    const isIncorrect = currentAnswer === answer && currentAnswer !== props.correctAnswer;
    const correctAnswerClass = isCorrect ? "correct-answer" : "";
    const incorrectAnswerClass = isIncorrect ? "incorrect-answer" : "";
    const enableClass = currentAnswer ? "disabled-class" : "enabled-class";

    function observerACB(payload){
        if(payload.currentAnswer=== "reset"){
            setCurrentAnswer(null);
        }
        if (payload.currentAnswer && payload.currentAnswer!=="reset"){
            setCurrentAnswer(payload.currentAnswer)
        }
    }

    function chooseAnswerACB(){
        props.onUpdateCurrentAnswer(answer);
    }

    function componentWasCreatedACB(){   //   1. the component has been created
        props.model.addObserver(observerACB)
        return function isTakenDownACB(){props.model.removeObserver(observerACB)}
    }   
    React.useEffect( componentWasCreatedACB, [] );

    return (
        <div 
        className={`answer ${correctAnswerClass} ${incorrectAnswerClass} ${enableClass} animate__animated animate__fadeInUp`}
        onClick={chooseAnswerACB}>
            {answer}
        </div>
    )
}
