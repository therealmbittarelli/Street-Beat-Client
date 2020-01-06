import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersBands from './UsersBands';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';
import BandSearch from '../components/BandSearch/BandSearch';

class UserDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usersBands: []
    }
  }
  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();

    const url = `${config.API_ENDPOINT}/bands/mybands`;

    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.context.setUsersBands(data);
        this.context.setBandsList(data);
        console.log('')
      })
      .catch(console.log);
  }

  renderUsersBands = () => {
    const bandsUserIsIn = this.context.usersBands;
    return bandsUserIsIn.map(band =>

      < UsersBands
        id={band.id}
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