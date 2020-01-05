import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandsListContext from '../Context';
// import TokenService from '../services/token-service.js'
// import config from '../config';

export default class UsersBands extends Component {

  static contextType = BandsListContext;

  static defaultProps = {
    band_name: '',
    id: ''
  }

  handleSetActiveBand = () => {
    console.log('we made it here');
    return this.context.setActiveBand(this.props.id)
  }

  render() {
    return (
      <div key={this.props.id}>
        <Link
          to={`/dashboard/band/${this.props.id}`}
          onClick={this.handleSetActiveBand}
        >{this.props.band_name}</Link>
      </div>
    )
  }
} 
