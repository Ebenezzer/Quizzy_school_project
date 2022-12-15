import React from "react";
import { FiArrowRight } from 'react-icons/fi';
import "./gameView.css"
import Answer from '../../components/Answer'
import { shuffleArray } from "../../helpFunctions";

export default
function GameView(props){
    const answers = shuffleArray(props.answers)

    function updateCurrentAnswerACB(answer){
        props.onUpdateCurrentAnswer(answer)
    }

    function updateQuestionACB(){
        props.onUpdateQuestion()
    }
    return (
        <div className="answerGridContainer">
          <div id='questionCard' className={`${props.enabledQuestion} animate__animated animate__fadeInDown`} onClick={updateQuestionACB}>
            <div id="questionCount">Question {props.currentQuestionIndex}/3</div>
            <div>{props.question.question}</div>
            <div id="nextQuestion" className={`${props.enabledQuestion} animate__animated animate__fadeIn`}>Next question <FiArrowRight/></div>
          </div>
          <Answer model={props.model} 
            answer={answers[0]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={answers[1]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={answers[2]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
          <Answer model={props.model} 
            answer={answers[3]} 
            currentAnswer={props.currentAnswer}
            correctAnswer={props.correctAnswer}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}/>
        </div>
      );
}    
