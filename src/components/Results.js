import React, { PureComponent as Component } from 'react';

function Results(props) {
  return (
    <div>
      { props.flights.map( f => <p key={ f.id }>{ f.flight_num }</p>)}
    </div>
  );
}

export default Results;
