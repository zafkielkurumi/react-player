import React from 'react';
import './App.scss';
import Player from 'pages/aimer_top/player'
import {RouterConfig } from 'route';

function App() {
  return (
    <div >
       <div className="content"><RouterConfig ></RouterConfig></div>
        <Player></Player>
    </div>
  );
}

export default App;
