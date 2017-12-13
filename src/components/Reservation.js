import React, { PureComponent as Component } from 'react';
import Flight from './Flight';
import { Link } from 'react-router-dom';

import axios from 'axios';
import _ from 'underscore';

const SERVER_URL = 'http://localhost:5000/flights/'

class Reservation extends Component {
  constructor( props ) {
    super( props );
    this.state = { flight: '' };

    const fetchFlights = () => {
      axios.get( SERVER_URL + this.props.match.params.flightId +".json" ).then( results => this.setState( { flight: results.data } ) );
    }
    fetchFlights();
  }

  render() {
    return (
    <div>
      <h1> Reservation </h1>
      < FlightInfo flightId={ this.props.match.params.flightId } />
      < SeatingPlan flightId={ this.props.match.params.flightId } />
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
  constructor( props ) {
    super( props );
    this.state = { airplane: {} };

    const fetchAirplane = () => {
      axios.get( SERVER_URL + props.flightId ).then( results => this.setState( { airplane: results.data.airplane } ) );
    }
    fetchAirplane();
  }

  render() {
    const columns = this.state.airplane.columns;
    const rows = this.state.airplane.rows;

    return (
      <div>
        <h1> Seating plan coming soon </h1>
        <div className="plan">
          { this.state.airplane.name }
          { this.state.airplane.columns }

        </div>
      </div>
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
