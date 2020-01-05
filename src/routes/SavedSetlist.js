import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandsListContext from '../Context';
// import TokenService from '../services/token-service.js'
// import config from '../config';

export default class SavedSetlist extends Component {


  static contextType = BandsListContext;

  static defaultProps = {
    setlistId: '',
    title: '',
    date: '',
    bandId: '',
    match: ''
  }


  render() {
    const bandId = this.props.bandId;

    return (
      <div key={this.props.id}>
        <Link
          to={`/dashboard/band/${bandId}/setlist`}
        >{`${this.props.title}, ${this.props.date}`}</Link>
      </div>
    )
  }
}
