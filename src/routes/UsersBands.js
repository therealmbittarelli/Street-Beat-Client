import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

export default class UsersBands extends Component {

  static contextType = BandsListContext;

  static defaultProps = {
    band_name: ''
  }


  render() {
    console.log('key and band_name', this.props.id, this.props.band_name)
    this.context.activeBand = this.props.id
    console.log('thiscontextactiveband', this.context.activeBand);
    return (
      <div key={this.props.id}>
        <Link to='/dashboard/band'>{this.props.band_name}</Link>
      </div>
    )
  }
} 
