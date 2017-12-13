import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'underscore';

const SERVER_URL = 'http://localhost:5000/airplanes.json'

class Airplane extends Component {

  constructor() {
    super();
    this.state = { airplanes: [] };

    this.createAirplane = this.createAirplane.bind( this );

    const fetchAirplanes = () => {
      axios.get( SERVER_URL ).then( results => this.setState( { airplanes: results.data } ) );
    }
    fetchAirplanes();
  }

  createAirplane(name, rows, columns) {
    console.log(this.state);
    axios.post(SERVER_URL, {name: name, rows: rows, columns:  columns}).then( results => this.setState( { airplanes:   [results.data, ...this.state.airplanes] })
    )
  }

  render() {
    return (
      <div>
        <h1> Burning Fleet </h1>
        < CreateAirplane onSubmit= {this.createAirplane} />
        < SeatingPlan airplanes={ this.state.airplanes } />
      </div>

    )
  }
}

class CreateAirplane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rows: '',
      columns: '',
    };
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleRowChange = this._handleRowChange.bind(this);
    this._handleColumnChange = this._handleColumnChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

    _handleNameChange(e) {
      this.setState({ name: e.target.value });
    }

    _handleRowChange(e) {
      this.setState({ rows: e.target.value });
    }

    _handleColumnChange(e) {
      this.setState({ columns: e.target.value });
    }

    _handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.name, this.state.rows, this.state.columns);
      this.setState( { name: '', rows: '', columns: '' });
    }

  render() {
    return (
      <div>
        <h3> Add a New Plane </h3>
        <form onSubmit={ this._handleSubmit }>
          <label> Name: </label>
            <input type="text" value={ this.state.name } onChange={this._handleNameChange} placeholder="747" />


            <label> Row: </label>
            <input type="text" value={ this.state.rows} onChange={ this._handleRowChange } placeholder="6" />

            <label> Column: </label>
            <input type="text" value={ this.state.columns} onChange={ this._handleColumnChange } placeholder="24" />

            <input type="submit" value="Add"/>
        </form>
      </div>
    )
  }
}

class SeatingPlan extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
        <h3> Seating Plan </h3>
        { this.props.airplanes.map(airplane=> (
          <div className="airplane" key={airplane.id}>
            <span> {airplane.name} </span><span> Rows: {airplane.rows} </span><span> Columns: {airplane.columns} </span>
            <div className="plan">
              { _( airplane.columns ).times( () => <div className="row">{ _.range( parseInt( airplane.rows ) ).map( () => <div className ="seat"></div> ) }</div> ) }
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Airplane;
