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
      algoTitle: null,
      triggerAlgorithm: false,
      resetGrid: false,
      speed: 20,
      selectingWeight: false,
      startNode:{},
      finishNode:{},
      clearPath: false
    }
  }

  clearPath = (e) => {
    e.preventDefault()
    const {startNode, finishNode, clearPath} = this.state
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path');
    }
    document.getElementById(`node-${startNode.row}-${startNode.col}`).className = 'Node node-start';
    document.getElementById(`node-${finishNode.row}-${finishNode.col}`).className = 'Node node-finish';
    this.setState({clearPath: !clearPath});
  }
  clearBoard = (e) => {
    e.preventDefault()
    const { resetGrid } = this.state
    var el = document.getElementsByClassName('Node');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('node-visited', 'node-shortest-path', 'node-start', 'node-finish', 'node-wall', 'node-weight');
    }
    document.getElementById(`node-10-15`).className = 'Node node-start';
    document.getElementById(`node-10-40`).className = 'Node node-finish';
    this.setState({ resetGrid: !resetGrid });
  }
  selectAlgorithm = (e) => {
    e.preventDefault();
    const { name , text} = e.target;
    this.setState({ algorithm: name, algoTitle: text })
  }
  triggerAlgo = (e) => {
    if (window.innerWidth < 1250) {
      e.preventDefault();
    }
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
    const { algorithm, triggerAlgorithm, resetGrid, speed, selectingWeight, startNode, finishNode, clearPath, algoTitle } = this.state;
    return (
      <div className="Container">
        <nav className="navbar navbar-inverse">
          <div className='container-fluid'>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavBar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to='/'>Home</Link>
              <Link className="navbar-brand" to="/SortingVisualizer">Sorting Visualizer</Link>
            </div>
            <div className="collapse navbar-collapse" id="myNavBar">
              <ul className="nav navbar-nav" >
                <li className="nav-item small-tag dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownMenuLink" href="#">Algorithms <span className='caret'></span></a>
                  <ul className="dropdown-menu" id="AlgorithmList" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Dijkstra" href="#">Dijkstra</a></li>
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Depth First Search" href="#">Depth First Search (*)</a></li>
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="BFS" href="#">Breadth First Search (*)</a></li>
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="AStar" href="#">A star</a></li>
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="GreadyBFS" href="#">Gready Best First Search</a></li>
                    <li><a className="dropdow-item" onClick={this.selectAlgorithm} name="Swarm" href="#">Swarm</a></li>
                  </ul>
                </li>
                <li className='nav-item'>
                  <a data-toggle="dropdown" href="#">Select Speed<span className="caret"></span></a>
                  <ul className="nav-item small-tag dropdown-menu">
                    <li><a className="dropdow-item" onClick={this.selectSpeed} name='fast' href="#">Fast</a></li>
                    <li><a className="dropdow-item" onClick={this.selectSpeed} name='medium' href="#">Medium</a></li>
                    <li><a className="dropdow-item" onClick={this.selectSpeed} name='slow' href="#">Slow</a></li>
                  </ul>
                </li>
                <li className='nav-item main-btn'>
                  <a onClick={this.triggerAlgo} data-toggle="collapse" href={window.innerWidth < 1250 ? "#myNavBar" : "#"}>{!algorithm ? 'Please Pick Algorithm' : 'Visualize ' + algoTitle} </a>
                </li>
                <li className='nav-item small-tag'>
                  <a onClick={this.clearBoard} href="#">ClearBoard</a>
                </li>
                <li className='nav-item small-tag'>
                  <a onClick={this.clearPath} href="#">Clear Path</a>
                </li>

                <li className='nav-item select-weight' >
                  <div className="selectDiv">
                    <div className="text-inline col-md-9">
                      <label >Select Weight</label>
                    </div>
                    <div className="Box col-md-3">
                      <Switch
                        onChange={this.selectWeight}
                        checked={selectingWeight}
                        id="normal-switch"
                        className="checkbox"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Route exact path="/PathFinding">
          <Grid
            triggerAlgorithm={triggerAlgorithm}
            algorithm={algorithm}
            algoTitle={algoTitle}
            resetGrid={resetGrid}
            clearPath={clearPath}
            speed={speed}
            selectingWeight={selectingWeight}
            startNode ={startNode}
            finishNode={finishNode}
          ></Grid>
        </Route>
      </div>
    );
  }
}

export default PathFinding;