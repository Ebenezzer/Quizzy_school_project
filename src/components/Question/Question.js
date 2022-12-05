import React, { useState } from 'react'
import Answer from '../Answer'
import "./Question.css"

export default function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState(props.currentAnswer);
  const enableClass = currentAnswer ? "enabled-class" : "disabled-class"; 

  function observerACB(payload) {
    if (payload.currentAnswer==="reset"){
      if (payload.currentAnswer === props.correctAnswer){
        props.onUpdateRoundArray(true)
      }
      if (payload.currentAnswer !== props.correctAnswer){
        props.onUpdateRoundArray(false)
      }
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
    props.onNewQuestion()
    updateCurrentAnswerACB("reset")
    props.model.notifyObservers({answer: ""})
  }

  return (
    <div className={`answer-grid-container ${enableClass}`}>
      <div className='questionCard' onClick={newQuestionACB}>{props.question}</div>
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
}