import React from "react";
import "./categoryView.css"

export default
function CategoryView(props){
    function getNewQuestionsACB(categoryCard){
        props.onGetNewQuestions(categoryCard.target.id)
    }
    return(
        <div className="categoryGrid">
            <div id={props.categories[0]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                {/* {props.categoryImages[props.categories[0]]} */}
                <img src="src\Assets\Images\category cards\film_and_tv.png"></img>
            </div>
            <div id={props.categories[1]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                {props.categoryImages[props.categories[1]]}
            </div>
            <div id={props.categories[2]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                {props.categoryImages[props.categories[2]]}
            </div>
            <div id={props.categories[3]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                {props.categoryImages[props.categories[3]]}
            </div>
        </div>
    );
}   