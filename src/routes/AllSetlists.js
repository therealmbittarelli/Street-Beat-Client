import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';
import SavedSetlist from './SavedSetlist';

export default class AllSetlists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setlists: []
    }
  }

  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/bands/:band_id/setlists`;

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
        this.setState({
          setlists: data
        });

      });
  }

  renderSavedSetlists() {
    const allSavedSetlists = this.state.setlists
    console.log('this state setlists is', this.state.setlists);
    return allSavedSetlists.map(setlist =>
      <SavedSetlist
        key={setlist.id}
        title={setlist.band_name}
        date={setlist.date}
      />
    );
  }

  render() {
    const { error } = this.context;

    return (
      <div>
        {/* need to populate list of setlists */}
        <section list="true" className="members_list">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderSavedSetlists()}
        </section>
        <section id="add-setlist-container">
          <p>Create a new setlist</p>
          <Link to={'/dashboard/band/setlists/buildsetlist'}>Build it!</Link>
        </section>
      </div>
    );
  }
}