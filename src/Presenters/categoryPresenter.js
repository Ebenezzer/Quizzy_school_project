import React from 'react'
import { useNavigate } from 'react-router-dom';
import { shuffleArray } from '../helpFunctions';
import CategoryView from '../Views/categoryView/categoryView'

export default function Category(props) {
    const navigate = useNavigate();
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

    function getNewQuestionsACB(category){
        props.model.getNewQuestions(category);
        console.log(category)
        navigate("/game");
    }
    
    return (
        <div>
            <CategoryView 
            categories={categories}
            onGetNewQuestions={getNewQuestionsACB}/>
        </div>
    )
}
