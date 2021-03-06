import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HallOfFame from '../HallOfFame/container';
const style = require('./style.css');

class App extends Component {
  public render() {
    return (
      <div className={style.container}>
        <Route path="/" component={HallOfFame}/>
        <ToastContainer/>
      </div>
    );
  }
}

export default App;
