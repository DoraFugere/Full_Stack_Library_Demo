import React from 'react';
import './App.css';

import Nav from './Nav';

import Livres from './Livres';



import {BrowserRouter as Router,Switch, Route} from'react-router-dom';



function App() {
  return (
    <Router>
    <div className="App">
      <Nav/>
      <Switch>

      <Route path="/" exact />

      <Route path="/livres" component={Livres} />

      </Switch>
    </div>
    </Router>
  );
}

export default App;
