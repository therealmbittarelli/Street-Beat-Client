import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import BandsListContext from '../../Context';
import '../../routes/BandDashboard.css';
// import config from '../../config';


export default class BandMembers extends Component {
  static contextType = BandsListContext;

  // static defaultProps = {

  // }


  render() {
    return (
      <div className="individual-bandmember" key={this.props.id}>
        {`${this.props.first_name} ${this.props.last_name}`}
      </div>
    )
  }
}
