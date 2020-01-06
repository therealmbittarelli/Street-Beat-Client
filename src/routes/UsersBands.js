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
    return this.context.setActiveBand(this.props.id)
  }

  render() {
    const band_name = this.props.band_name;
    return (
      <div key={this.props.id}>
        <Link
          to={{
            pathname: `/dashboard/band/${this.props.id}`,
            state: {
              band_name: band_name,
            }
          }}
          onClick={this.handleSetActiveBand}

        >{this.props.band_name}</Link>
      </div>
    )
  }
} 
