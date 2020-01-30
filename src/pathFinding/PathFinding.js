import React, { Component } from 'react';
import './PathFinding.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Grid from './GridAndNode/Grid'


class PathFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: null,
      triggerAlgorithm: false,
      resetGrid: false,
      speed: 20
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
  selectSpeed = (value) => {
    this.setState({speed: value})
  }
  render() {
    const { algorithm, triggerAlgorithm, resetGrid, speed } = this.state;
    return (
      <Router>
        <div className="App">
          <div className="navbar">
            <a className="navbar-brand" href="/PathFinding">PathFinding Visualizer</a>
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
                <a className='navbar-brand' onClick={this.triggerAlgo} href="#">{!algorithm ? 'Please Pick Algorithm' : 'Visualize ' + algorithm} </a>
              </li>
              <li>
                <a onClick={this.clearBoard}>ClearBoard</a>
              </li>
              <li>
                <a onClick={this.clearPath}>Clear Path</a>
              </li>
              <li>
                <a data-toggle="dropdown" href="#">Speed</a>
                <ul className="dropdown-menu">
                  <li>
                    <a onClick={() => this.selectSpeed(3)} href="#">Fast</a>
                  </li>
                  <li>
                    <a onClick={() => this.selectSpeed(60)} href="#">Medium</a>
                  </li>
                  <li>
                    <a onClick={() => this.selectSpeed(100)} href="#">Slow</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div id="mainGrid">
            <div id="mainText">
            </div>
            <div id="algorithmDescriptor">
            </div>
          </div>
          <div>
            <Route exact path="/PathFinding">
              <Grid
                triggerAlgorithm={triggerAlgorithm}
                algorithm={algorithm}
                resetGrid={resetGrid}
                speed={speed}
              ></Grid>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default PathFinding;