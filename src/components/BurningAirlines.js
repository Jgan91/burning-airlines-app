import React, { PureComponent as Component } from 'react';
// import Airplane from './Airplane.js';
// import Flight from './Flight.js';
// import Search from './Search.js';
import { Link } from 'react-router-dom';

class BurningAirlines extends Component {
  render() {
    return (
      <div>
        <h1><Link to="/">Burning Airlines</Link> </h1>
        <p><Link to="/airplane">Airplane</Link> </p>
        <p><Link to="/flight">Flight</Link> </p>
        <p><Link to="/search">Search</Link> </p>
      </div>
    );
  }
}

export default BurningAirlines;
