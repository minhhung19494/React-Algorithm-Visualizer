import React, { Component } from 'react';
import './PathFinding.css';
import { Route, Link } from 'react-router-dom';
import Grid from './GridAndNode/Grid'
import Switch from 'react-switch'


class PathFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: null,
      triggerAlgorithm: false,
      resetGrid: false,
      speed: 20,
      selectingWeight: false
    }
  }

  clearPath = (e) => {
    e.preventDefault()
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path');
    }
  }
  clearBoard = (e) => {
    e.preventDefault()
    const { resetGrid } = this.state
    // var el = document.getElementsByClassName('Node');
    // for (let i = 0; i < el.length; i++) {
    //   el[i].classList.remove('node-visited', 'node-shortest-path', 'node-start', 'node-finish', 'node-wall', 'node-weight');
    // }
    // this.setState({ triggerAlgorithm: false });
    this.setState({ resetGrid: !resetGrid });
  }
  selectAlgorithm = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    this.setState({ algorithm: textContent })
  }
  triggerAlgo = (e) => {
    e.preventDefault();
    const { triggerAlgorithm, algorithm } = this.state
    if (algorithm === null) {
      alert("Please select algorithm")
      return
    }
    this.setState({ triggerAlgorithm: !triggerAlgorithm });
  }
  selectSpeed = (e) => {
    e.preventDefault()
    const { name } = e.target
    switch (name) {
      case 'fast':
        this.setState({ speed: 30 });
        break;
      case 'medium':
        this.setState({ speed: 60 });
        break;
      case 'slow':
        this.setState({ speed: 100 });
        break;
    }
  }
  selectWeight = (checked, event, id) => {
    this.setState({ selectingWeight: checked });
  }
  render() {
    const { algorithm, triggerAlgorithm, resetGrid, speed, selectingWeight } = this.state;
    return (
      <div className="App">
        <nav className="navbar navbar-fixed-top">
          <div className='container-fluid'>
            <div className="nav-header">
              <Link className="navbar-brand" to='/'>Home</Link>
              <Link className="navbar-brand" to="/SortingVisualizer">Sorting Visualizer</Link>
            </div>
            <ul className="nav nav-pills nav-justified" >
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownMenuLink" href="#">Algorithms <span className='caret'></span></a>
                <ul className="dropdown-menu" id="AlgorithmList" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Dijkstra" href="#">Dijkstra</a></li>
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Depth First Search" href="#">Depth First Search</a></li>
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="BFS" href="#">Breadth First Search</a></li>
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="AStar" href="#">A star</a></li>
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="GreadyBFS" href="#">Gready Best First Search</a></li>
                  <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Swarm" href="#">Swarm</a></li>
                </ul>
              </li>
              <li className='nav-item'>
                <a data-toggle="dropdown" href="#">Select Speed<span className="caret"></span></a>
                <ul className="nav-item dropdown-menu">
                  <li><a className="dropdow-item" onClick={this.selectSpeed} name='fast' href="#">Fast</a></li>
                  <li><a className="dropdow-item" onClick={this.selectSpeed} name='medium' href="#">Medium</a></li>
                  <li><a className="dropdow-item" onClick={this.selectSpeed} name='slow' href="#">Slow</a></li>
                </ul>
              </li>
              <li className='nav-item main-btn'>
                <a onClick={this.triggerAlgo} href="#">{!algorithm ? 'Please Pick Algorithm' : 'Visualize ' + algorithm} </a>
              </li>
              <li className='nav-item'>
                <a onClick={this.clearBoard} href="#">ClearBoard</a>
              </li>
              <li className='nav-item'>
                <a onClick={this.clearPath} href="#">Clear Path</a>
              </li>

              <li className='nav-item' >
                <div className="selectDiv">
                  <div className="Box col-md-3">
                    <Switch
                      onChange={this.selectWeight}
                      checked={selectingWeight}
                      id="normal-switch"
                      className="checkbox"
                    />
                  </div>
                  <div className="text-inline col-md-9">
                    <label >Select Weight</label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
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
              selectingWeight={selectingWeight}
            ></Grid>
          </Route>
        </div>
      </div>
    );
  }
}

export default PathFinding;