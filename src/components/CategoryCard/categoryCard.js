import "./categoryCard.css"
import 'animate.css';

export default
function CategoryCard(props){
    function findQuestionsACB(){
        props.onFindQuestions(props.category)
    }
    return(
        <div className="categoryCard animate__animated animate__fadeIn" onClick={findQuestionsACB} style={{backgroundImage: props.image}}>
            {props.category}
        </div>
    )
}