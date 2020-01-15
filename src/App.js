import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PathFinding from './PathFinding';
import Sorting from './SortingVisualize/SortingVisualizer'


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/">
            <div class="navbar">
              <a class="navbar-brand" href="/">Algorithms Visualizer</a>
              <ul class="nav navbar-nav">
                <li class="active">
                  <a href="/PathFinding">PathFinding</a>
                </li>
                <li>
                  <a href="/SortingVisualizer">Sorting</a>
                </li>
              </ul>
            </div>
          </Route>
          <div className="PathFinding">
            <Route exact path="/PathFinding">
              <PathFinding></PathFinding>
            </Route>
          </div>
          <div>
            <Route exact path="/SortingVisualizer">
              <Sorting></Sorting>
            </Route>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
