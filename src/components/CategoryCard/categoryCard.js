import "./categoryCard.css"

export default
function CategoryCard(props){
    function findQuestionsACB(){
        props.onFindQuestions(props.category)
    }
    return(
        <div className="categoryCard" onClick={findQuestionsACB}>
            {props.category}
        </div>
    )
}