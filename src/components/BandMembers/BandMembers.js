import React, { Component } from 'react';
import BandsListContext from '../../Context';
import '../../routes/BandDashboard.css';


export default class BandMembers extends Component {
  static contextType = BandsListContext;

  render() {
    return (
      <div className="individual-bandmember" key={this.props.id}>
        {`${this.props.first_name} ${this.props.last_name}`}
      </div>
    );
  }
}
