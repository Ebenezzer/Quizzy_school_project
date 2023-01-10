import React from "react";
import "./categoryView.css"
import test from "../../Assets/Images/categoryCards/film_and_tv.png"

export default
function CategoryView(props){
    function getNewQuestionsACB(categoryCard){
        props.onGetNewQuestions(categoryCard.target.id)
    }
    return(
        <div className="categoryGrid">
            <div className="categoryChoice">
                    Choose category
            </div>
            <div id={props.categories[0]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}> 
                <img src={props.categoryImages[props.categories[0]]} className="categoryImage"></img>
            </div>
            <div id={props.categories[1]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                <img src={props.categoryImages[props.categories[1]]} className="categoryImage"></img>
            </div>
            <div id={props.categories[2]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                <img src={props.categoryImages[props.categories[2]]} className="categoryImage"></img>
            </div>
            <div id={props.categories[3]} className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB}>
                <img src={props.categoryImages[props.categories[3]]} className="categoryImage"></img>
            </div>
        </div>
    );
}   