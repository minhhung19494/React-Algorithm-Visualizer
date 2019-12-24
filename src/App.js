import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Grid from './pathFinding/GridAndNode/Grid'

class App extends Component {
  clearWallandWeights = () => {
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-wall');
    }
  }
  clearPath = () => {
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path', 'node-start', 'node-finish');
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <a className="navbar-brand" href="#">PathFiding Visualizer</a>
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms</a>
                <ul className="dropdown-menu" id="AlgorithmList">
                  <li className="navbar-nav">
                    <Link to="/Dijkstra">Dijkstra</Link>
                  </li>
                  <li className="navbar-nav">
                    <Link to="/DFS">DFS</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Maze & Pattern</a>
              </li>
              <li>
                <a href="#">Add Bomb</a>
              </li>
              <li>
                <a href="#">Visualizer</a>
              </li>
              <li>
                <a href="#">ClearBoard</a>
              </li>
              <li>
                <a className="btn btn-primary" onClick={this.clearWallandWeights}>Clear Walls and Weights</a>
              </li>
              <li>
                <a className="btn btn-primary" onClick={this.clearPath}>Clear Path</a>
              </li>
              <li>
                <a href="#">Speed</a>
              </li>
              <li>
                <a className="btn btn-primary" onClick={this.setStartNode}>Set Start Node</a>
              </li>
              
            </ul>
          </div>

          <div id="mainGrid">
            <div id="mainText">
            </div>
            <div id="algorithDescriptor">
            </div>
          </div>
          <div>
            <Route path="/Dijkstra">
              <Grid></Grid>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
