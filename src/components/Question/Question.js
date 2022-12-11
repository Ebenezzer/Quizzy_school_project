/*import React, { useState } from 'react'
import Answer from '../Answer'
import "./Question.css"
import { FiArrowRight } from 'react-icons/fi';

export default function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState(props.currentAnswer);
  const enableClass = currentAnswer ? "enabled-class" : "disabled-class"; 
  const [,reRender] = useState()

  function observerACB(payload) {
    if (payload.currentAnswer==="reset"){
      setCurrentAnswer(null)
    }
    if (payload.currentAnswer && payload.currentAnswer!=="reset"){
      setCurrentAnswer(payload.currentAnswer)
    }
  }

  function componentWasCreatedACB(){   //   1. the component has been created
    props.model.addObserver(observerACB)
    return function isTakenDownACB(){props.model.removeObserver(observerACB)}
  }   
  React.useEffect( componentWasCreatedACB, [] );

  function updateCurrentAnswerACB(currentAnswer){
    props.model.notifyObservers({currentAnswer: currentAnswer})
  }

  function newQuestionACB(){
    props.onUpdateRoundArray(currentAnswer)
    props.onNewQuestion(currentAnswer)
    updateCurrentAnswerACB("reset")
    props.model.notifyObservers({answer: ""})
    reRender()
  }

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
  )
}*/