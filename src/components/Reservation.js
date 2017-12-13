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

  render() {
    return (
    <div>
      <h1> Reservation </h1>
      < AddName onSubmit={ this.createUser } />
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
        Name:
        <br />
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
        { _.range( parseInt( airplane.columns ) ).map( ( column, columnIndex ) => <div className="row">{ _.range( parseInt( airplane.rows ) ).map( ( row, rowIndex ) => <div className="seat" data-column={ String.fromCharCode( columnIndex + 65 ) } data-row={ rowIndex + 1 } onClick={ this._handleClick }>{ rowIndex + 1 }{ String.fromCharCode( columnIndex + 65 ) }</div> ) }</div> ) }
      </div>
      </div>
    )
  }
}

class SelectedSeat extends Component {
  render() {
    return (
      <div>
      <h3> Choose your seat wisely or you might die </h3></div>
    );
  }
}

class AddName extends Component {
  constructor(props) {
    super(props);
    this.state = { name: ''};

  this._handleNameChange = this._handleNameChange.bind(this);
  }

  _handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // this.props.onSubmit(this.state.value);
    console.log('submitted');
    // this.setState( { name: ''});
  }

  render() {
    return (
      <div>
          <form onSubmit={ this._handleSubmit}>
            <label> First Name: </label>
            <input type="text" value={ this.state.name } onChange={this._handleNameChange} placeholder="Ben" />
            <input type="submit" value="Submit"/>
          </form>
      </div>
    )
  }
}

export default Reservation;
