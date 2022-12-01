import './App.css';
import Home from './Presenters/homePresenter';
import GameModel from './ameModel';

export default
function App(props) {
  return (
    <div className="App">
      <Home model = {props.GameModel}/>
    </div>
  );
}

