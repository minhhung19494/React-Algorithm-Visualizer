import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from './GridAndNode/Grid';

import Sorting from './SortingVisualize/SortingVisualizer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: null,
      triggerAlgorithm: false,
      resetGrid: false
    }
  }

  clearPath = () => {
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path');
      this.setState({ triggerAlgorithm: false })
    }
  }
  clearBoard = (grid) => {
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path', 'node-start', 'node-finish', 'node-wall', 'node-wieght');
    }
    this.setState({ triggerAlgorithm: false });
    this.setState({ resetGrid: true });
  }
  selectAlgorithm = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    this.setState({ algorithm: textContent })
  }
  triggerAlgo = () => {
    this.setState({ triggerAlgorithm: true });
    this.setState({ resetGrid: false })
  }
  render() {
    const { algorithm, triggerAlgorithm, resetGrid } = this.state;
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <a className="navbar-brand" href="/">PathFiding Visualizer</a>
            <a className="navbar-brand" href="/SortingVisualize">Sorting Visualizer</a>
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms</a>
                <ul className="dropdown-menu" id="AlgorithmList">
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} href="#" name="Dijkstra">Dijkstra</a>
                  </li>
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} name="Depth First Search" href="#">Depth First Search</a>
                  </li>
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} name="BFS" href="#">Breadth First Search</a>
                  </li>
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} name="AStar" href="#">A star</a>
                  </li>
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} name="GreadyBFS" href="#">Gready Best First Search</a>
                  </li>
                  <li className="navbar-nav">
                    <a onClick={this.selectAlgorithm} name="Swarm" href="#">Swarm</a>
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
                <a className='btn btn-primary' onClick={this.triggerAlgo} href="#">{!algorithm ? 'Please Pick Algorithm' : 'Visualize ' + algorithm} </a>
              </li>
              <li>
                <a className="btn btn-default" onClick={this.clearBoard}>ClearBoard</a>
              </li>
              <li>
                <a className="btn btn-default" onClick={this.clearPath}>Clear Path</a>
              </li>
              <li>
                <a className="dropdow-toggle btn btn-default" data-toggle="dropdown" href="#">Speed</a>
                <ul className="dropdown-menu">
                  <li>Fast</li>
                  <li>Medium</li>
                  <li>Slow</li>
                </ul>
              </li>
              <li>
                <a className="btn btn-default" onClick={this.setStartNode}>Set Start Node</a>
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
            <Route exact path="/">
              <Grid
                triggerAlgorithm={triggerAlgorithm}
                algorithm={algorithm}
                resetGrid={resetGrid}
              ></Grid>
            </Route>
          </div>
          <div>
            <Route exact path="/SortingVisualize">
              <Sorting></Sorting>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
