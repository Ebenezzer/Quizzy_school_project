import React from 'react'
import { useNavigate } from 'react-router-dom';
import { shuffleArray } from '../helpFunctions';
import CategoryView from '../Views/categoryView/categoryView';

// import arts_and_literature from '../Assets/Images/category cards/arts_and_literature.png';
// import film_and_tv from '../Assets/Images/category cards/film_and_tv.png';
// import food_and_drink from '../Assets/Images/category cards/food_and_drink.png';
// import general_knowledge from '../Assets/Images/category cards/general_knowledge.png';
// import geography from '../Assets/Images/category cards/geography.png';
// import history from '../Assets/Images/category cards/history.png';
// import music from '../Assets/Images/category cards/music.png';
// import science from '../Assets/Images/category cards/science.png';
// import society_and_culture from '../Assets/Images/category cards/society_and_culture.png';
// import sport_and_leisure from '../Assets/Images/category cards/sport_and_leisure.png';

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

    const categoryImages = {
        // "arts_and_literature": arts_and_literature,
        // "film_and_tv": film_and_tv,
        // "food_and_drink": food_and_drink,
        // "general_knowledge": general_knowledge,
        // "geography": geography,
        // "history": history,
        // "music": music,
        // "science": science,
        // "society_and_culture": society_and_culture,
        // "sport_and_leisure": sport_and_leisure
    }

    function getNewQuestionsACB(category){
        props.model.getNewQuestions(category);
        navigate("/game");
    }

    return (
        <div>
            <CategoryView 
            categories={categories}
            categoryImages={categoryImages}
            onGetNewQuestions={getNewQuestionsACB}/>
        </div>
    )
}
