import GameView from "../Views/gameView/gameView";
import React, { useState } from "react";
import promiseNoData from "../Views/promiseNoData/promiseNoData";
import { useNavigate } from 'react-router-dom';
import { shuffleArray } from "../helpFunctions";
import NoUserView from "../Views/noUserView";

export default
function Game(props){
    const navigate = useNavigate();
    const [questionsPromiseStatePromise, setquestionsPromiseStatePromise] = useState(props.model.questionsPromiseState.promise);
    const [questionsPromiseStateData, setquestionsPromiseStateData] = useState(props.model.questionsPromiseState.data);
    const [questionsPromiseStateError, setquestionsPromiseStateError] = useState(props.model.questionsPromiseState.error);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [answers, setAnswers] = useState()
    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser)

    // Creating observer to update questionPromiseState, reset currentAnswer, reset currentQuestionIndex and check if user is signed out
    function observerACB(){
        setquestionsPromiseStatePromise(props.model.questionsPromiseState.promise);
        setquestionsPromiseStateData(props.model.questionsPromiseState.data);
        setquestionsPromiseStateError(props.model.questionsPromiseState.error);
        setCurrentAnswer(null)
        setCurrentQuestionIndex(0);
        setUserLogin(props.model.currentUser)
    }

    function componentWasCreatedACB(){   //   1. the component has been created
        props.model.addObserver(observerACB)
        return function isTakenDownACB(){props.model.removeObserver(observerACB)}
    }   
    React.useEffect( componentWasCreatedACB, [] );
    
    // Setting round results based on the answer chosen
    function updateRoundResults(currentAnswer){
        if (currentAnswer === questionsPromiseStateData[currentQuestionIndex].correctAnswer){
            props.model.setRoundResults([...props.model.roundResults, "correct"])
        }
        if (currentAnswer !== questionsPromiseStateData[currentQuestionIndex].correctAnswer){
            props.model.setRoundResults([...props.model.roundResults, "incorrect"])
        }
    }

    // Show next question when clicking the questionCard for previous question
    function updateQuestionACB(){
        if (currentQuestionIndex<questionsPromiseStateData.length-1){
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentAnswer(null);
            setAnswers(null);
        }
        else{
            if(props.model.roundResults.length>3){
                alert("Cheater! You get no points for this round.")
                props.model.setRoundResults(["incorrect", "incorrect", "incorrect"])
            }
            props.model.updateResults(props.model.currentGame.player1===props.model.currentGame.turn?"player1":"player2")
            navigate("/gameResults");
        }
    }

    // When choosing an answer set that answer as the current answer to check if it was correct or not
    function updateCurrentAnswerACB(answer) {
        setCurrentAnswer(answer);
        updateRoundResults(answer);
    }

    // If there is no current answer and the answers have not been set but there is data, then the answers should be shuffled
    // Otherwise they should not be shuffled so they do not confuse the user.
    if(!currentAnswer && !answers && questionsPromiseStateData){
        setAnswers(shuffleArray([questionsPromiseStateData[currentQuestionIndex].correctAnswer, ...questionsPromiseStateData[currentQuestionIndex].incorrectAnswers]));
    }

    // If user is signed out the NoUserView should be returned otherwise the GameView should be returned
    return (!userLoggedIn ? <NoUserView /> : 
    <div className="wrapper">
        {promiseNoData({promise: questionsPromiseStatePromise, data:questionsPromiseStateData, error: questionsPromiseStateError})
        || <GameView question={questionsPromiseStateData[currentQuestionIndex]}
            currentAnswer={currentAnswer}
            correctAnswer={questionsPromiseStateData[currentQuestionIndex].correctAnswer}
            enabledAnswer={currentAnswer ? "disabledAnswer" : "enabledAnswer"}
            enabledQuestion={currentAnswer ? "enabledQuestion": "disabledQuestion"}
            currentQuestion={currentQuestionIndex+1}
            onUpdateQuestion={updateQuestionACB}
            onUpdateCurrentAnswer={updateCurrentAnswerACB}
            answers={answers}/>}
    </div>)
}