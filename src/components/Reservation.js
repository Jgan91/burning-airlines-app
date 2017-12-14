import React, { PureComponent as Component } from 'react';

import Flight from './Flight';
import { Link } from 'react-router-dom';

import axios from 'axios';
import _ from 'underscore';

const SERVER_URL = 'http://localhost:5000/flights/'

class Reservation extends Component {
  constructor( props ) {
    super( props );
    this.state = { flight: '', selectedSeat: { row: '', column: '' }, seats: [] };

    this.fetchSelectedSeat = this.fetchSelectedSeat.bind( this );

    const fetchFlights = () => {
      axios.get( SERVER_URL + this.props.match.params.flightId +".json" ).then( results => this.setState( { flight: results.data } ) );
    }
    fetchFlights();

    const fetchUsers= () => {
      axios.get( SERVER_URL ).then( results => this.setState( { users: results.data } ) );
    }
    fetchUsers();
  }


  createUser(name) {
    console.log(this.state);
    axios.post(SERVER_URL, {name: name}).then( results => this.setState( { users:   [results.data, ...this.state.users] })
    )
  }

  fetchSelectedSeat( row, column ) {
    this.setState( { selectedSeat: { row: row, column: column } } );
  }

  render() {
    return (
    <div>
      <h1> Reservation </h1>
      < FlightInfo flightId={ this.props.match.params.flightId } />
      < SeatingPlan flight={ this.state.flight } onClick={ this.fetchSelectedSeat } />
      < SelectedSeat seat={ this.state.selectedSeat } flightId={ this.props.match.params.flightId } />
    </div>
    )
  }
}

class FlightInfo extends Component {
  constructor( props ) {
    super( props );
    this.state = { flight: '', users: [] };

    const flightId = props.flightId
    const fetchFlights = () => {
      axios.get( SERVER_URL+ props.flightId +".json" ).then( results => this.setState( { flight: results.data } ) );
    }
    fetchFlights();
  }

  render() {
    return (

      // { props.users.map(u => (
      // <div className="username"> {u.name}</div>))} </div>
      <div>
      <h2 className="flightdeets">
        Flight Date: { this.state.flight.date }
        <br/>
        Flight Number: { this.state.flight.flight_num }
        <br/>
        { this.state.flight.origin } > { this.state.flight.destination }
      </h2>
      </div>

    )
  }
}

class SeatingPlan extends Component {
  constructor( props ) {
    super( props );
    this.state = { airplane: this.props.flight.airplane };

    this._handleClick = this._handleClick.bind( this );
  }

  _handleClick(e) {
    console.log( e.target, e.target.attributes[ "data-column" ].value , e.target.attributes[ "data-row" ].value );
    this.props.onClick( e.target.attributes[ "data-row" ].value, e.target.attributes[ "data-column" ].value );
  }

  render() {
    const airplane = this.props.flight.airplane;
    const reservations = this.props.flight.reservations;
    console.log( reservations );
    console.log( _.isObject( _( reservations ).findWhere( { row: '4', column: 'A' } ) ) );

    if ( airplane === undefined ) {
      console.log( airplane );
      return (
        <p>Loading...</p>
      )
    }

    return (
      <div>
      <h2>Seating plan</h2>
      <div className="plan">
        { _.range( parseInt( airplane.columns ) ).map( ( column, columnIndex ) =>
          <div className="row">{ _.range( parseInt( airplane.rows ) ).map( ( row, rowIndex ) =>
            <button className={ `seat ${ rowIndex + 1 }${ String.fromCharCode( columnIndex + 65 ) }` }
              data-column={ String.fromCharCode( columnIndex + 65 ) }
              data-row={ rowIndex + 1 }
              onClick={ this._handleClick }
            >
              { `${ rowIndex + 1 }${ String.fromCharCode( columnIndex + 65 ) }` }
            </button> ) }
          </div> ) }
      </div>
      </div>
    )
  }
}

class SelectedSeat extends Component {
  constructor( props ) {
    super( props );

    this.makeReservation = this.makeReservation.bind( this );
  }

  makeReservation(e) {
    e.preventDefault();
    console.log( 'clicked' );
    const userId = 4;
    axios.post( 'http://localhost:5000/reservations.json', { user_id: userId, flight_id: this.props.flightId, row: this.props.seat.row, column: this.props.seat.column } )

  }

  render() {
    return (
      <div>
        <h3> Choose your seat wisely or you might die... </h3>
        { this.props.seat.row }{ this.props.seat.column }
        <form onSubmit={ this.makeReservation }>
          <input type="text" placeholder="Name" />
          <input type="submit" value="Select Seat" />
        </form>
      </div>
    )
  }
}

export default Reservation;
