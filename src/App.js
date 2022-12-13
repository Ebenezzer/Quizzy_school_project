import './App.css';
import GameResultsView from './Views/gameResultsView/gameResultsView';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import GameModel from './GameModel';
import Home from './Presenters/homePresenter';
import LogIn from './Presenters/loginPresenter';
import SidebarView from './Views/sidebarView/sidebarView';
import Leaderboard from './Presenters/leaderboardPresenter';

export default


function App() {
  const model = new GameModel();
  return (
    <div className="App">
      <SidebarView/>
      <Show hash="#gameResults">
        <GameResultsView model={model}/>
      </Show>
      <Game model={model}/>
      <Show hash="#home">
        <Home/>
      </Show>
      <Show hash= "#login">
        <LogIn/>
      </Show>
      <Show hash="#leaderboard">
        <Leaderboard/>
      </Show> 

      </div>
  );
}

