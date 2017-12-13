import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  createAirplane(a) {
    console.log(this.state);
    axios.post(SERVER_URL, {name: a}).then( results => this.setState( { airplanes: [results.data, ...this.state.airplanes] })
  )
}

  render() {
    return (
      <div>
        <h1> Airplane </h1>
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

    _handleRowChange(f) {
      this.setState({ rows: f.target.value });
    }

    _handleColumnChange(g) {
      this.setState({ columns: g.target.value });
    }

    _handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.name, this.state.rows, this.state.columns);
      this.setState( { name: '', rows: '', columns: '' });
    }

  render() {
    return (
      <div>
        <h3> Add new plane </h3>
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
          <div key={airplane.id}>
            <p> {airplane.name} </p>
          </div>
        ))}
      </div>
    )
  }
}

export default Airplane;
