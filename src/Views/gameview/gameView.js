import React from "react";
import { FiArrowRight } from 'react-icons/fi';
import "./gameView.css"

export default
function GameView(props){

    function updateCurrentAnswerACB(answer){
        props.onUpdateCurrentAnswer(answer.target.id)
    }

    function updateQuestionACB(){
        props.onUpdateQuestion()
    }
    return (
        <div className="answerGridContainer">
            <div id='questionCard' className={`${props.enabledQuestion} animate__animated animate__fadeInDown`} onClick={updateQuestionACB}>
                <div id="questionCount">Question {props.currentQuestion}/3</div>
                <div>{props.question.question}</div>
                <div id="nextQuestion" className={`${props.enabledQuestion} animate__animated animate__fadeIn`}>Next question <FiArrowRight/></div>
            </div>

            <div id={props.answers[0]} className={`answer ${props.currentAnswer && props.answers[0] === props.correctAnswer ? "correctAnswer" : ""} 
            ${props.currentAnswer === props.answers[0] && props.currentAnswer !== props.correctAnswer ? "incorrectAnswer" : ""} 
            ${props.enabledAnswer}
            animate__animated animate__fadeInUp`}
            onClick={updateCurrentAnswerACB}>
                {props.answers[0]}
            </div>

            <div id={props.answers[1]} className={`answer ${props.currentAnswer && props.answers[1] === props.correctAnswer ? "correctAnswer" : ""} 
            ${props.currentAnswer === props.answers[1] && props.currentAnswer !== props.correctAnswer ? "incorrectAnswer" : ""} 
            ${props.enabledAnswer}
            animate__animated animate__fadeInUp`}
            onClick={updateCurrentAnswerACB}>
                {props.answers[1]}
            </div>

            <div id={props.answers[2]} className={`answer ${props.currentAnswer && props.answers[2] === props.correctAnswer ? "correctAnswer" : ""} 
            ${props.currentAnswer === props.answers[2] && props.currentAnswer !== props.correctAnswer ? "incorrectAnswer" : ""} 
            ${props.enabledAnswer}
            animate__animated animate__fadeInUp`}
            onClick={updateCurrentAnswerACB}>
                {props.answers[2]}
            </div>

            <div id={props.answers[3]} className={`answer ${props.currentAnswer && props.answers[3] === props.correctAnswer ? "correctAnswer" : ""} 
            ${props.currentAnswer === props.answers[3]  && props.currentAnswer !== props.correctAnswer ? "incorrectAnswer" : ""} 
            ${props.enabledAnswer}
            animate__animated animate__fadeInUp`}
            onClick={updateCurrentAnswerACB}>
                {props.answers[3]}
            </div>
        </div>
    );
}   
