import React, { useState } from "react";
import Question from "../../components/Question/Question";
import { shuffleArray } from "../../helpFunctions";

export default
function GameView(props){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [roundArray, setRoundArray] = useState([false])

    function updateQuestionACB(){
        if (currentQuestionIndex<props.questions.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }else{
            window.location.hash = "#gameResults";
            console.log(roundArray);
        }
    }

    function updateRoundArrayCB(isCorrectAnswer){
        setRoundArray(roundArray => [...roundArray, isCorrectAnswer])
    }

    return(
        <div>
            <Question question={props.questions[currentQuestionIndex].question}
            correctAnswer={props.questions[currentQuestionIndex].correctAnswer}
            answers = {shuffleArray([props.questions[currentQuestionIndex].correctAnswer, ...props.questions[currentQuestionIndex].incorrectAnswers])}
            model={props.model}
            onNewQuestion={updateQuestionACB}
            onUpdateRoundArray={updateRoundArrayCB}/>
        </div>
    );
}    
