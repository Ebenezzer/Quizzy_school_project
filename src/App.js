import './App.css';
import GameModel from './GameModel';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const GameResults=require('./Presenters/gameResultsPresenter.js').default;
const Game=require('./Presenters/gamePresenter.js').default;
const Home=require('./Presenters/homePresenter.js').default;
const LogIn=require('./Presenters/loginPresenter.js').default;
const Signup=require('./Presenters/signupPresenter.js').default;
const Sidebar=require('./Views/sidebarView/sidebarView.js').default;


export default

function App() {
  const model = new GameModel();
  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path ="/" element= {<Sidebar/>}> 
          <Route path ="gameresults" element= {<GameResults model={model}/>}/>
          <Route path ="game" element= {<Game model={model}/>}/>
          <Route path ="home" element= {<Home model = {model}/>}/>
          <Route path ="login" element= {<LogIn model = {model}/>}/> {/* what if I want path to be "/" so that's the first thing that is rendered when app is passed */}
          <Route path ="signup" element= {<Signup model = {model}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
