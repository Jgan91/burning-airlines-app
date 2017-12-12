import React from 'react';

function Results(props) {
  return (
    <div>
<<<<<<< HEAD
      { props.flights.map( f => <p key={ f.id }>{ f.origin  }</p> ) }
=======
      <h3>Flights</h3>
      <div className="results-grid headings">
        <span className="results-date">Date</span>
        <span className="results-flight">Flight</span>
        <span className="results-from">From > To</span>
        <span className="results-plane">Plane</span>
      </div>
      { props.flights.map( f =>
        <div className="results-grid" key={ f.id }>
          <span className="results-date">{ f.date }</span>
          <span className="results-flight">{ f.flight_num }</span>
          <span className="results-from">{ f.origin } > { f.destination }</span>
          <span className="results-plane"></span>
        </div>
      ) }
>>>>>>> 86cefd6022885d5c2c2f024fdf3ba46e0dfcc559
    </div>
  );
}

export default Results;
