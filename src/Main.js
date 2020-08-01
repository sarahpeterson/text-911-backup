import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Details from './components/Details/Details';
import Home from './components/App/App';

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/details" component={Details} />
      </Router>
    );
  }
}

export default Main;
