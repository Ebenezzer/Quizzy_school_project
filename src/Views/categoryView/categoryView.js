import React from "react";
import CategoryCard from "../../components/CategoryCard/categoryCard";
import { shuffleArray } from "../../helpFunctions";
import "./categoryView.css"

export default
function CategoryView(props){
    const categories = shuffleArray([
        "arts_and_literature",
        "film_and_tv",
        "food_and_drink",
        "general_knowledge",
        "geography",
        "history",
        "music",
        "science",
        "society_and_culture",
        "sport_and_leisure"
    ]);

    function findQuestionsACB(category) {
        props.onFindQuestions(category);
    }
    return(
        <div className="categoryGrid">
            <CategoryCard model={props.model} category={categories[0]} onFindQuestions={findQuestionsACB}/>
            <CategoryCard model={props.model} category={categories[1]} onFindQuestions={findQuestionsACB}/>
            <CategoryCard model={props.model} category={categories[2]} onFindQuestions={findQuestionsACB}/>
            <CategoryCard model={props.model} category={categories[3]} onFindQuestions={findQuestionsACB}/>
        </div>
    );
}   