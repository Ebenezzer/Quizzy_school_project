import './App.css';
import GameResultsView from './Views/gameResultsView/gameResultsViewTest';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import GameModel from './GameModel';
import Home from './Presenters/homePresenter';

export default

function App() {
  const model = new GameModel();
  return (
    <div className="App">
      <Show hash="#gameResults">
        <GameResultsView model={model}/>
      </Show>
      <Game model={model}/>
      <Show hash="#home">
        <Home/>
      </Show>

      </div>
  );
}

