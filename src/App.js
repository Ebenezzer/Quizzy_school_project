import './App.css';
import GameModel from './GameModel';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const GameResults=require('./Presenters/gameResultsPresenter.js').default;
const Category=require('./Presenters/categoryPresenter.js').default;
const Game=require('./Presenters/gamePresenter.js').default;
const Home=require('./Presenters/homePresenter.js').default;
const LogIn=require('./Presenters/loginPresenter.js').default;
const Signup=require('./Presenters/signupPresenter.js').default;
const Sidebar=require('./Presenters/sidebarPresenter.js').default;
const Leaderboard = require('./Presenters/leaderboardPresenter.js').default;
const NoUserView = require('./Views/noUserView.js').default;

export default

function App(props) {
  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path ="/" element= {<Sidebar model={props.model}/>}> 
          <Route path ="noUserView" element= {<NoUserView/>}/>
          <Route path ="gameResults" element= {<GameResults model={props.model}/>}/>
          <Route path ="category" element= {<Category model={props.model}/>}/>
          <Route path ="game" element= {<Game model={props.model}/>}/>
          <Route path ="home" element= {<Home model = {props.model}/>}/>
          <Route path ="login" element= {<LogIn model = {props.model}/>}/> {/* what if I want path to be "/" so that's the first thing that is rendered when app is passed */}
          <Route path ="signup" element= {<Signup model = {props.model}/>}/>
          <Route path ="leaderboard" element ={<Leaderboard model = {props.model}/>}/>
          <Route path="*" element={<Navigate to="home" />} />
          <Route path="" element={<Navigate to="home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
