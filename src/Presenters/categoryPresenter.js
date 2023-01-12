import React from 'react'
import { useNavigate } from 'react-router-dom';
import { shuffleArray } from '../helpFunctions';
import CategoryView from '../Views/categoryView/categoryView';
import NoUserView from '../Views/noUserView';

// Logos for different categories
import film_and_tv from '../Assets/Images/categoryCards/film_and_tv.png';
import food_and_drink from '../Assets/Images/categoryCards/food_and_drink.png';
import general_knowledge from '../Assets/Images/categoryCards/general_knowledge.png';
import geography from '../Assets/Images/categoryCards/geography.png';
import history from '../Assets/Images/categoryCards/history.png';
import music from '../Assets/Images/categoryCards/music.png';
import science from '../Assets/Images/categoryCards/science.png';
import society_and_culture from '../Assets/Images/categoryCards/society_and_culture.png';
import sport_and_leisure from '../Assets/Images/categoryCards/sport_and_leisure.png';


export default function Category(props) {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLogin] = React.useState(props.model.currentUser)
    
    // Creating an observer to make sure a user is signed in
    function observerACB() {
        setUserLogin(props.model.currentUser)
    }

    function wasCreatedACB() {
        props.model.addObserver(observerACB);
        return function isTakenDownACB() {
            props.model.removeObserver(observerACB)
        };
    }

    React.useEffect(wasCreatedACB, []);

    // An array of categories that is shuffled in order to recieve a random selection
    const categories = shuffleArray([
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
        "film_and_tv": film_and_tv,
        "food_and_drink": food_and_drink,
        "general_knowledge": general_knowledge,
        "geography": geography,
        "history": history,
        "music": music,
        "science": science,
        "society_and_culture": society_and_culture,
        "sport_and_leisure": sport_and_leisure
    }

    // Callback to get new questions based on chosen category
    function getNewQuestionsACB(category){
        props.model.getNewQuestions(category);
        navigate("/game");
    }

    // if user is signed in return CategoryView, otherwise return NoUserView
    return (!userLoggedIn ? <NoUserView /> : 
        <div>
            <CategoryView 
                categories={categories}
                categoryImages={categoryImages}
                onGetNewQuestions={getNewQuestionsACB}/>
        </div>)
}
