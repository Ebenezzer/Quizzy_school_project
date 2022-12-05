import './App.css';
import GameResultsView from './Views/gameResultsView/gameResultsViewTest';

function App(props){
  return (
    <div className="App">
      <GameResultsView model={props.model}/>
    </div>
  );
}

export default App;
