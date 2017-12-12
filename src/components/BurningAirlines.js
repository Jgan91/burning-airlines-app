import React, { PureComponent as Component } from 'react';
import Airplane from './Airplane.js';
import Flight from './Flight.js';
import Search from './Search.js';

class BurningAirlines extends Component {
  render() {
    return (
      <div>
        <Airplane />
        <Flight />
        <Search />
      </div>
    );
  }
}

export default BurningAirlines;
