import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import PathFinding from './pathFinding/PathFinding';
import Sorting from './SortingVisualize/SortingVisualizer'

const BASE_ROUTE = ''
const NavBar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="Header">
          <a className="navbar-brand" href='/'>Algorithms Visualizer</a>
        </div>
        <div className="myNavBar">
          <ul className="nav navbar-nav">
            <li>
              <Link to='/PathFinding'>PathFinding Visualizer </Link>
            </li>
            <li>
              <Link to='/SortingVisualizer'>Sorting Visualizer</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={`${BASE_ROUTE}/`} component={NavBar} />
          <Route exact path={`${BASE_ROUTE}/PathFinding`} component={PathFinding} />
          <Route exact path={`${BASE_ROUTE}/SortingVisualizer`} component={Sorting} />
        </Switch>
      </div>
    );
  }
}

export default App;
