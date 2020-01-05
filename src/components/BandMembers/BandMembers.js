import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import BandsListContext from '../../Context';
// import config from '../../config';


export default class BandMembers extends Component {
  static contextType = BandsListContext;

  static defaultProps = {

  }


  render() {

    return (
      <div key={this.props.id}>
        {/* <Link to='/dashboard/band'>{this.props.band_name}</Link> */}
        <p>{`${this.props.first_name} ${this.props.last_name}`}</p>
      </div>
    )
  }
}
