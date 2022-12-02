import React, { useState } from 'react'
import Answer from '../Answer'
import "./Question.css"

export default function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState()

  function answerCheckACB(answer){
    setCurrentAnswer(answer)
    console.log(answer)
}

  return (
    <div className='answerGridContainer'>
      <div className='questionCard'>{props.question.question}</div>
      <Answer answer={props.question.correctAnswer} correctAnswer={props.question.correctAnswer} currentAnswer={currentAnswer} onChosenAnswer={answerCheckACB}/>
      <Answer answer={props.question.incorrectAnswers[0]} correctAnswer={props.question.correctAnswer} currentAnswer={currentAnswer} onChosenAnswer={answerCheckACB}/>
      <Answer answer={props.question.incorrectAnswers[1]} correctAnswer={props.question.correctAnswer} currentAnswer={currentAnswer} onChosenAnswer={answerCheckACB}/>
      <Answer answer={props.question.incorrectAnswers[2]} correctAnswer={props.question.correctAnswer} currentAnswer={currentAnswer} onChosenAnswer={answerCheckACB}/>
    </div>
  )
}
