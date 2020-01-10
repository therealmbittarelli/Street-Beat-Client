import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandsListContext from '../Context';
import './UserDashboard.css';

export default class UsersBands extends Component {

  static contextType = BandsListContext;

  static defaultProps = {
    band_name: '',
    id: '',
    key: ''
  }

  handleSetActiveBand = () => {
    return this.context.setActiveBand(this.props.id);
  }

  render() {
    const band_name = this.props.band_name;
    return (
      <div id="user-list-of-bands">
        <Link
          id="band-links"
          to={{
            pathname: `/dashboard/band/${this.props.id}`,
            state: {
              band_name: band_name,
            }
          }}
          onClick={this.handleSetActiveBand}

        >{this.props.band_name}</Link>
      </div>
    );
  }
} 
