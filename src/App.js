import './App.css';
import GameResultsView from './Views/gameResultsViewTest';

function App(props){
  return (
    <div className="App">
      <GameResultsView model={props.model}/>
    </div>
  );
}

export default App;
