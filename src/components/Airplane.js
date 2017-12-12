import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/airplanes.json'

class Airplane extends Component {

  constructor() {
    super();
    this.state = { planes: [] };


  }

  createAirplane(a) {

  }
  
  render() {
    return (
      <div>
        <h1> Airplane </h1>
        < CreateAirplane onsubmit= {this.createAirplane} />
        < SeatingPlan />
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

    _handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state.name, this.state.rows, this.state.columns);

    }

    _handleRowChange(f) {
      this.setState({ rows: f.target.value });
    }
    //
    // _handleRowSubmit(f) {
    //   f.preventDefault();
    //   this.props.onSubmit(this.state.rows);
    //   this.setState( {rows: ''})
    // }
    //
    _handleColumnChange(g) {
      this.setState({ columns: g.target.value });
    }
    //
    // _handleColumnSubmit(g) {
    //   g.preventDefault();
    //   this.props.onSubmit(this.state.columns);
    //   this.setState( {columns: ''})
    // }

  render() {
    return (
      <div>
        <h3> Add new plane </h3>
        <form onSubmit={ this._handleSubmit }>
          <label> Name:
            <input type="text" value={ this.state.name } onChange={this._handleNameChange} placeholder="747" />
            </label>
            <label> Row: </label>
            <input type="text" value={ this.state.rows} onChange={ this._handleRowChange } placeholder="6" />
            <label> Column: </label>
            <input type="text" value={ this.state.columns} onChange={ this._handleColumnChange } placeholder="24" />
            <input type="submit" value="Add" onChange= {this._handleChange}/>
        </form>
      </div>
    )
  }
}

class SeatingPlan extends Component {
  render() {
    return (
      // <div>
      //   { this.props.name }
      // </div>
      <h3> Seating Plan </h3>


    )
  }
}

export default Airplane;
