import React from "react";

export default
function GameView(props){
    function renderQuestionsCB(question){
        return(
            <QuestionCard/>
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
