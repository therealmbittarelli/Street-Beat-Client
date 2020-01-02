import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

export default class UsersBands extends Component {

  static contextType = BandsListContext;

  static defaultProps = {
    key: '',
    title: '',
    date: ''
  }


  render() {
    console.log('key and band_name', this.props.key, this.props.title, this.props.date)
    return (
      <div>
        <Link to='/dashboard/band/setlists/:setlist_id'>{this.props.title}</Link>
      </div>
    )
  }
}
