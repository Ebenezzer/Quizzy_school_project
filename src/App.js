import './App.css';
import GameList from './components/gameList';
import HomePresenter from './Presenters/homePresenter';
function App() {
  return (
    <div className="App">
      <HomePresenter/>
      <GameList></GameList>
    </div>
  );
}

export default App;
