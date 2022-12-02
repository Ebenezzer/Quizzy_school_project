import React from 'react'
import "./Question.css"

export default function Question(props) {
  return (
    <div className='answerGridContainer'>
      <div className='questionCard'>{props.question.question}</div>
      <div className='answer'>{props.question.correctAnswer}</div>
      <div className='answer'>{props.question.correctAnswer}</div>
      <div className='answer'>{props.question.correctAnswer}</div>
      <div className='answer'>{props.question.correctAnswer}</div>
    </div>
  )
}
