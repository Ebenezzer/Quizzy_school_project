import './App.css';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import QuizModel from './QuizModel';
import Home from './Presenters/homePresenter';

export default

function App() {
  const model = new QuizModel();
  return (
    <div className="App">
      <Game model={model}/>
      <Home/>
      </div>
  );
}

