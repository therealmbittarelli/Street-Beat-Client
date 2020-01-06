import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from '../components/Utils/Utils';
// import TokenService from '../services/token-service.js'
// import BandsListContext from '../Context';
import './NavBar.css';
// import config from '../config';

class NavBar extends Component {

  static defaultProps = {
    bandId: ''
  }

  render() {
    const bandId = this.props.bandId;
    console.log('navbar bandid is', bandId);

    return (
      <div>
        <nav id="nav-bar">
          <Link
            to={`/dashboard/band/${bandId}/setlists`}>Setlists</Link>
          <Link
            to={`/dashboard/band/${bandId}/songs`}>Repertoire</Link>
          <br />
          <Link
            to={'/dashboard/user'}>User Dashboard</Link>
          <Link
            to={`/dashboard/band/${bandId}`}>Band Dashboard</Link>

        </nav>
      </div>
    );
  }
}

export default NavBar;