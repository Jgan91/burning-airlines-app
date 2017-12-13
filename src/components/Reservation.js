import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/reservations.json'

class Reservation extends Component {
  render() {
    return (
    <div>
      <h1> Reservation </h1>
      < FlightInfo />
      < SeatingPlan />
      < SelectedSeat />
      <h2>{ this.props.match.params.flightId }</h2>
    </div>
    )
  }
}

class FlightInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h2> Flight info coming soon </h2>
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
