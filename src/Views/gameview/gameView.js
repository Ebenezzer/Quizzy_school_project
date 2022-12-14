import React from "react";
import { FiArrowRight } from 'react-icons/fi';
import "./gameView.css"
import Answer from '../../components/Answer'

export default
function GameView(props){
    function updateCurrentAnswerACB(answer){
        props.onUpdateCurrentAnswer(answer)
    }

    function updateQuestionACB(){
        props.onUpdateQuestion()
    }
    return (
        <div className="answer-grid-container">
          <div id='question-card' className={`${props.enabledQuestion} animate__animated animate__fadeInDown`} onClick={updateQuestionACB}>
            <div>{props.question.question}</div>
            <div id="next-question" className={`${props.enabledQuestion} animate__animated animate__fadeIn`}>Next question <FiArrowRight/></div>
          </div>
          <Answer model={props.model} 
            answer={props.answers[0]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[1]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[2]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={props.answers[3]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
        </div>
      );
}    
