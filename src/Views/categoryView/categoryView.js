import React from "react";
import CategoryCard from "../../components/CategoryCard/categoryCard";
import { shuffleArray } from "../../helpFunctions";
import "./categoryView.css"
import historyIMG from "../../Assets/Images/vecteezy_quill-writing-on-paper-cartoon-vector-icon-illustration_6096481.jpg"

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

    return(
        <div className="categoryGrid">
            <CategoryCard model={props.model} category={categories[0]} image={historyIMG}/>
            <CategoryCard model={props.model} category={categories[1]}/>
            <CategoryCard model={props.model} category={categories[2]}/>
            <CategoryCard model={props.model} category={categories[3]}/>
        </div>
    );
}   