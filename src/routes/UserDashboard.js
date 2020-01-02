import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersBands from './UsersBands';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';
import BandSearch from '../components/BandSearch/BandSearch';
// src/Context.js
class UserDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usersBands: []
    }
  }
  static contextType = BandsListContext;

  componentDidMount() {
    console.log('this.context is', this.context);
    const authToken = TokenService.getAuthToken();
    if (!authToken) {
      return this.props.history.push('/');
    }
    if (this.context.activeUser) {
      const url = `${config.API_ENDPOINT}/users/${this.context.activeUser}/mybands`;

      fetch(url, {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('data is', data);
          this.context.setBandsList(data);
        });
    }
  }




  renderUsersBands = () => {
    const bandsUserIsIn = this.context.usersBands;
    console.log('this context usersBands is', this.context.usersBands);
    return bandsUserIsIn.map(band =>

      < UsersBands
        id={band.id} // maybe not needed here
        band_name={band.band_name}
      />
    );
  }

  render() {
    const { error } = this.context;

    return (
      <div>
        <h2>User dashboard</h2>
        <section list="true" className="BandsList">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderUsersBands()}
        </section>
        <BandSearch />
        <section id="add-band-container">
          <p>Don't see your band listed?</p>
          <Link to={'/registerband'}>Add it!</Link>
        </section>
      </div>
    );
  }
}

export default UserDashboard;