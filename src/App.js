import './App.css';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import GameModel from './GameModel';
import Home from './Presenters/homePresenter';

export default

function App() {
  const model = new GameModel();
  return (
    <div className="App">
      <Game model={model}/>
      <Show hash="#home">
        <Home/>
      </Show>

      </div>
  );
}

