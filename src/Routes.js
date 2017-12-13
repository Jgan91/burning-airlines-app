import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';


import BurningAirlines from './components/BurningAirlines';
import Airplane from './components/Airplane';
import Flight from './components/Flight';
import Search from './components/Search';
import Reservation from './components/Reservation';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ BurningAirlines } />
      <Route exact path="/airplane" component={ Airplane } />
      <Route path="/flight/:flightId" component={ Flight } />
      <Route exact path="/search" component={ Search } />
      <Route exact path="/reservation" component={ Reservation } />
    </div>
  </Router>
)

export default Routes;
