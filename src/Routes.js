import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';


import BurningAirlines from './components/BurningAirlines';
import Airplane from './components/Airplane';
import Flight from './components/Flight';
import Search from './components/Search';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ BurningAirlines } />
      <Route exact path="/airplane" component={ Airplane } />
      <Route exact path="/flight" component={ Flight } />
      <Route exact path="/search" component={ Search } />
    </div>
  </Router>
)

export default Routes;
