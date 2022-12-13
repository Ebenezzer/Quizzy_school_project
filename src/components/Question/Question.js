import React, { useState } from 'react'
import Answer from '../Answer'
import "./Question.css"
import 'animate.css';
import { FiArrowRight } from 'react-icons/fi';

export default function Question(props) {

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


}