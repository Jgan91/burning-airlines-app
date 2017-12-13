import React, { PureComponent as Component } from 'react';
import Flight from './Flight';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/flights/'

class Reservation extends Component {
  render() {
    return (
    <div>
      <h1> Reservation </h1>
      < FlightInfo flightId={ this.props.match.params.flightId } />
      < SeatingPlan />
      < SelectedSeat />
      <h2>{ this.props.match.params.flightId }</h2>
    </div>
    )
  }
}

class FlightInfo extends Component {
  constructor( props ) {
    super( props );
    this.state = { flight: '' };

    const flightId = props.flightId
    console.log( flightId );
    const fetchFlights = () => {
      axios.get( SERVER_URL+ props.flightId +".json" ).then( results => this.setState( { flight: results.data } ) );
    }
    fetchFlights();
  }

  render() {
    return (
      <h2>
        { this.state.flight.date }
        { this.state.flight.flight_num }
        { this.state.flight.origin } > { this.state.flight.destination }
      </h2>
    )
  }
}

class SeatingPlan extends Component {


  render() {
    return (
      <h1> Seating plan coming soon </h1>
    )
  }
}

class SelectedSeat extends Component {
  render() {
    return (
      <h2> Chosen seat </h2>
    )
  }
}

export default Reservation;
