import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

export default class AllSetlists extends Component {
  // constructor(props) {
  //   super(props);
  // }

  static contextType = BandsListContext;

  static defaultProps = {
    match: ''
  }

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists`;

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
        this.context.setBandSetlists(data);
      });
  }

  renderSavedSetlists = () => {
    const allSavedSetlists = this.context.bandSetlists;
    const bandId = this.props.match.params.bandId;

    console.log('this context setlists is', allSavedSetlists);
    console.log('all setlists bandid is', bandId);

    return allSavedSetlists.map((setlist) => {
      console.log('allsaved map,', setlist)

      return <Link
        to={{
          pathname: `/dashboard/band/${bandId}/setlist`,
          state: {
            title: setlist.title,
            date: setlist.date,
            setlist_id: setlist.id,
          }
        }}
      >{`${setlist.title}, ${setlist.date}`}
        <p />
      </Link>
    });
  }

  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;
    return (
      <div>
        <NavBar bandId={bandId} />
        <section list="true" className="saved-setlists">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderSavedSetlists()}
        </section>
        <section id="add-setlist-container">
          <p>Create a new setlist</p>
          <Link to={`/dashboard/band/${bandId}/setlists/createsetlist`}>Build it!</Link>
        </section>
      </div>
    );
  }
}


