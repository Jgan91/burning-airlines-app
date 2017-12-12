import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';

import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/flights.json';

// function Results(props) {
//   return (
//     <div>
//       { props.flights.map( f => <p key={ f.id }>{ f.flight_num }</p>)}
//     </div>
//   );
// }

class Flight extends Component {
  constructor() {
    super();
    this.state = { flights: [] };

    const fetchFlights = () => {
      axios.get( SERVER_URL ).then( results => this.setState( {flights: results.data} ) );
    }
    fetchFlights();
  }



  render() {
    return (
      <div>
        <h1>flights soon</h1>
        <Results flights={ this.state.flights } />
      </div>
    )
  }
}

export default Flight;
