import React, { useState } from 'react'
import 'animate.css';

export default function Answer(props) {
    function chooseAnswerACB(){
        props.onUpdateCurrentAnswer(props.answer);
    }

    return (
        <div 
        className={`answer 
        ${props.currentAnswer && props.answer === props.correctAnswer ? "correct-answer" : ""} 
        ${props.currentAnswer === props.answer && props.currentAnswer !== props.correctAnswer ? "incorrect-answer" : ""} 
        animate__animated animate__fadeInUp`}
        onClick={chooseAnswerACB}>
            {props.answer}
        </div>
    )
}
