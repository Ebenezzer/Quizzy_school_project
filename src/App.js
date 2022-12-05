import './App.css';
<<<<<<< HEAD
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import QuizModel from './QuizModel';

function App() {
  const model = new QuizModel();
  return (
    <div className="App">
      <Game model={model}/>
=======
import Home from './Presenters/homePresenter';

export default
function App(props) {
  return (
    <div className="App">
      <Home/>
>>>>>>> edina's-branch
    </div>
  );
}

