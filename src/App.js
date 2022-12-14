import './App.css';
import GameResultsView from './Views/gameResultsView/gameResultsView';
import Show from './components/show/show';
import Game from './Presenters/gamePresenter';
import GameModel from './GameModel';
import Home from './Presenters/homePresenter';
import LogIn from './Presenters/loginPresenter';
import { authChange, auth } from './firebase/firebaseModel';
import SidebarView from './Views/sidebarView/sidebarView';
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

//    authChange(auth)

export default

function App() {
  const model = new GameModel();
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path ="/sidebarview" element= {<SidebarView/>}/>
        <Route path ="/gameresults" element= {<GameResultsView model={model}/>}/>
        <Route path ="/game" element= {<Game model={model}/>}/>
        <Route path ="/home" element= {<Home/>}/>
        <Route path ="/login" element= {<LogIn/>}/> {/* what if I want path to be "/" so that's the first thing that is rendered when app is passed */}
      </Routes>
    </Router>
    </div>
  );
}

