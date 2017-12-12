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

class FlightsForm extends Component {
  constructor() {
    super();
    this.state = { flight_num: '', date: '', origin: '', destination: '', airplane_id: '' };
    this._handleChangeFlightNum = this._handleChangeFlightNum.bind(this);

    this._handleChangeDate = this._handleChangeDate.bind(this);

    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);

    this._handleChangeDestination = this._handleChangeDestination.bind(this);

    this._handleChangeAirplane = this._handleChangeAirplane.bind(this);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeFlightNum(e) {
    this.setState( { flight_num: e.target.value } );
  }

  _handleChangeDate(e) {
    this.setState( { date: e.target.value } );
  }

  _handleChangeOrigin(e) {
    this.setState( { origin: e.target.value } );
  }

  _handleChangeDestination(e) {
    this.setState( { destination: e.target.value } );
  }

  _handleChangeAirplane(e) {
    this.setState( { airplane: e.target.value } );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit( this.state.flight_num, this.state.date, this.state.origin, this.state.destination, this.state.airplane_id );
    this.setState( { flight_num: '', date: '', origin: '', destination: '', airplane_id: '' } );
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>

        <input type="text" onChange={this._handleChangeFlightNum} value={this.state.flight_num} placeholder="flight num" />

        <input type="text" onChange={this._handleChangeDate} value={this.state.date} placeholder="date" />

        <input type="text" onChange={this._handleChangeOrigin} value={this.state.origin} placeholder="origin" />

        <input type="text" onChange={this._handleChangeDestination} value={this.state.destination}  placeholder="destination" />

        <input type="text" onChange={this._handleChangeAirplane} value={this.state.airplane_id} placeholder="airplane id" />

        <input type="submit" value="create flight" />

      </form>
    );
  }
}

class Flight extends Component {
  constructor() {
    super();
    this.state = { flights: [] };

    const fetchFlights = () => {
      axios.get( SERVER_URL ).then( results => this.setState( { flights: results.data } ) );
    }
    fetchFlights();
  }





  render() {
    return (
      <div>
        <h1>burning airlines - create a flight</h1>
        <p><Link to="/airplane">Airplane</Link></p>
        <p><Link to="/flight">Flight</Link></p>
        <p><Link to="/search">Search</Link></p>
        <FlightsForm />
        <Results flights={ this.state.flights } />
      </div>
    )
  }
}

export default Flight;
