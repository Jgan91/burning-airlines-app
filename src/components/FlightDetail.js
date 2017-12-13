import React, { PureComponent as Component } from 'react';

class FlightDetail extends Component {
  constructor( props ) {
    super( props );
    console.log( this.props );
  }

  render() {
    return (
      <h2>{ this.props.match.params.flightId }</h2>
    )
  }
}

export default FlightDetail;
