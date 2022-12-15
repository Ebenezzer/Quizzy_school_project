import "./categoryCard.css"
import 'animate.css';

export default
function CategoryCard(props){
    function getNewQuestionsACB(){
        props.model.getNewQuestions(props.category);
        window.location.hash = "#game"
    }
    return(
        <div className="categoryCard animate__animated animate__fadeIn" onClick={getNewQuestionsACB} style={{backgroundImage: props.image}}>
            {props.category}
        </div>
    )
}