import './App.css';
import GameResultsView from './Views/gameResultsView/gameResultsView';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import GameModel from './GameModel';
import Home from './Presenters/homePresenter';
import LogIn from './Presenters/loginPresenter';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { app } from './firebase/firebaseModel';

const auth = getAuth(app)

  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          window.location.hash = "#home";
          console.log("user logged in")
      } else {
          window.location.hash = "#login";
          console.log("user not logged in")
      }
  })


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
      <Show hash= "#login">
        <LogIn/>
      </Show>

      </div>
  );
}

