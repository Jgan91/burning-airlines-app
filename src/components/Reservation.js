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
      < SeatingPlan flight={ this.state.flight } />
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

      <h2 className="flightdeets">
        Flight Date: { this.state.flight.date }
        <br/>
        Flight Number: { this.state.flight.flight_num }
        <br/>
        { this.state.flight.origin } > { this.state.flight.destination }
      </h2>

    )
  }
}

class SeatingPlan extends Component {
  constructor( props ) {
    super( props );
    this.state = { airplane: this.props.flight.airplane };

  }

  render() {
    const airplane = this.props.flight.airplane;
    if ( airplane === undefined ) {
      console.log( airplane );
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div>
      <h1> Seating plan coming soon </h1>
      <div className="plan">
        { _.range( parseInt( airplane.columns ) ).map( ( column, columnIndex ) => <div className="row">{ _.range( parseInt( airplane.rows) ).map( ( row, rowIndex ) => <div className="seat">{ columnIndex + 1 } - { rowIndex + 1 }</div> ) }</div> ) }
      </div>
      </div>
    )
  }
}

class SelectedSeat extends Component {
  render() {
    return (
      <div>
      <h3> Choose your seat wisely or you might die </h3>
      </div>
    )
  }
}

export default Reservation;
