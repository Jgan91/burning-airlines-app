import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import _ from 'underscore';

import Results from './Results';

const SERVER_URL = 'http://localhost:5000/flights.json'

class Search extends Component {
  constructor() {
    super();
    this.state = { flights: [] };

    this.fetchFlights = this.fetchFlights.bind( this );
  }

  fetchFlights( from, to ) {
    console.log( 'searching for flights from:', from, '>', to, this.state );
    axios.get( SERVER_URL ).then( results => {
      const allFlights = results.data;
      console.log( allFlights );
      let queriedFlights = allFlights.filter( flight => _( flight ).isMatch( { origin: from, destination: to } ) );
      if ( _( queriedFlights ).isEmpty() ) {
        queriedFlights = allFlights;
      }
      console.log( queriedFlights );
      this.setState( { flights: queriedFlights } );
    } );
      //results => console.log( _( results.data ).findWhere( { from: 'JFX', to: 'LAX' } ) ) );
      //results.data.map( ( result ) => console.log( result ) ) );
      //this.setState( { flights: _( results.data ).findWhere( { from: from, to: to } ) } ) );
  }

  render() {
    return (
      <React.Fragment>
        <h2>Search coming soon</h2>
        <FlightSearch onSubmit={ this.fetchFlights }/>
        <Results flights={ this.state.flights }/>
      </React.Fragment>
    );
  }
}

class FlightSearch extends Component {
  constructor( props ) {
    super( props );
    this.state = { from: '', to: '' };

    this._handleChangeFrom = this._handleChangeFrom.bind( this );
    this._handleChangeTo = this._handleChangeTo.bind( this );
    this._handleSubmit = this._handleSubmit.bind( this );
  }

  _handleChangeFrom(e) {
    this.setState( { from: e.target.value.toUpperCase() });
  }

  _handleChangeTo(e) {
    this.setState( { to: e.target.value.toUpperCase() });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit( this.state.from, this.state.to );
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        <input type="text" placeholder="from" onChange={ this._handleChangeFrom } />
        <input type="text" placeholder="to" onChange={ this._handleChangeTo } />
        <input type="submit" value="Search Flights" />
      </form>
    );
  }
}

export default Search;
