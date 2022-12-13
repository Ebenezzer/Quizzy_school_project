import React, { useState } from "react";
import Question from "../../components/Question/Question";
import { shuffleArray } from "../../helpFunctions";
import "./gameView.css"

export default
function GameView(props){
    return (
        <div className="answer-grid-container">
          <div id='question-card' className={`${enableClass} animate__animated animate__fadeInDown`} onClick={newQuestionACB}>
            <div>{props.question}</div>
            <div id="next-question" className={`${enableClass} animate__animated animate__fadeIn`}>Next question <FiArrowRight/></div>
          </div>
          <Answer model={props.model} 
            answer={props.answers[0]} 
            currentAnswer={currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[1]} 
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[2]} 
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[3]} 
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
        </div>
      );
}    
