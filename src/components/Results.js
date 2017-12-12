import React, { PureComponent as Component } from 'react';

function Results(props) {
  return (
    <div>
      { props.flights.map( f => <p key={ f.id }>{ f.origin  }</p> ) }
    </div>
  );
}

export default Results;
