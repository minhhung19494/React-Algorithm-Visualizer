import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import PathFinding from './pathFinding/PathFinding';
import Sorting from './SortingVisualize/SortingVisualizer'

const BASE_ROUTE = ''
const NavBar = () => {
  return (
    <div className="navbar">
      <a className="navbar-brand" href='/'>Algorithms Visualizer</a>
      <ul className="nav navbar-nav">
        <li>
          <Link to='/PathFinding'>PathFinding </Link>
        </li>
        <li>
          <Link to='/SortingVisualizer'>Sorting</Link>
        </li>
      </ul>
    </div>
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
