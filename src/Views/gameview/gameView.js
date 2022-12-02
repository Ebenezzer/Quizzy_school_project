import React from "react";
import Question from "../../components/Question/Question";

export default
function GameView(props){
    function renderQuestionsCB(question){
        return(
            <div>
                <Question question={question}/>
            </div>
        )
    }
    return(
        <div>
            {props.questions.map(renderQuestionsCB)}
        </div>
    );
}    
