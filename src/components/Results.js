import React from 'react';
import { Link } from 'react-router-dom';
import Flight from './Flight';
import Airplane from './Airplane';

function Results(props) {

  return (
    <div>
      <h3>Flights</h3>
      <div className="results-grid headings">
        <span className="results-date">Date</span>
        <span className="results-flight">Flight</span>
        <span className="results-from">From > To</span>
        <span className="results-plane">Plane</span>
        <span className="results-seat">Seats</span>
      </div>

      { props.flights.map( f =>
        <div className="results-grid" key={ f.id }>
          <span className="results-date">{ f.date }</span>
          <span className="results-flight"><Link to={/flight/+f.id}>{ f.flight_num }</Link></span>
          <span className="results-from">{ f.origin } > { f.destination }</span>
          <span className="results-plane">{ f.airplane_id }</span>
          <span className="results-seat">{ parseInt(f.airplane.rows) * parseInt(f.airplane.columns) }</span>
        </div>
      )}

    </div>
  );
}

export default Results;
