import React, { useState } from 'react'

export default function Answer(props) {
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)

    return (
        <div className='answer' onClick={props.onChosenAnswer(props.answer)}>{props.answer}</div>
    )
}
