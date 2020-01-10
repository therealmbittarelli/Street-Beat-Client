import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import { NiceDate } from '../components/Utils/Utils';
import config from '../config';
import './AllSetlists.css';

export default class AllSetlists extends Component {
  static contextType = BandsListContext;

  static defaultProps = {
    match: ''
  }

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.context.setBandSetlists(data);
      });
  }

  renderSavedSetlists = () => {
    const allSavedSetlists = this.context.bandSetlists;
    const bandId = this.props.match.params.bandId;

    return allSavedSetlists.map((setlist) => {
      let date = NiceDate(setlist.date)

      return <div key={setlist.id} id="setlist-list">
        <Link
          id="individual-saved-setlist"
          to={{
            pathname: `/dashboard/band/${bandId}/setlist`,
            state: {
              title: setlist.title,
              date: setlist.date,
              setlist_id: setlist.id,
            }
          }}
        >{setlist.title}, {date}
          <br />
        </Link>
      </div>
    });
  }

  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;
    return (
      <div id="all-setlists-container">
        <NavBar bandId={bandId} />
        <h2>Setlists</h2>
        <section list="true" className="saved-setlists">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderSavedSetlists()}
        </section>
        <section id="add-setlist-container">
          <p id="create-setlist-text">Create a new setlist</p>
          <Link
            id="add-setlist-link"
            to={`/dashboard/band/${bandId}/setlists/createsetlist`}>Build it!</Link>
        </section>
      </div>
    );
  }
}


