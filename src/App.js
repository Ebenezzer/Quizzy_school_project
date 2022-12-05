import './App.css';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import QuizModel from './QuizModel';

function App() {
  const model = new QuizModel();
  return (
    <div className="App">
      <Game model={model}/>
    </div>
  );
}

export default App;
