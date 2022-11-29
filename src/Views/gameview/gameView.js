import React from "react";

export default
function GameView(props){
    function renderQuestionsCB(question){
        return(
            <div>{question.question}</div>
        )
    }
    return(
        <div>
            <div>
                {props.questions.map(renderQuestionsCB)}
            </div>
        </div>
    );
}    
