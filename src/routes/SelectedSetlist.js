import React, { Component } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { NiceDate } from '../components/Utils/Utils';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';
import './SelectedSetlist.css';

export default class SelectedSetlist extends Component {

  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      setlistDuration: ''
    }
  }

  static contextType = BandsListContext;

  static defaultProps = {
    setlist_id: '',
    title: '',
    date: ''
  }

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const setlistId = this.props.location.state.setlist_id
    const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists/${setlistId}`;

    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          songs: data,
          setlistDuration: data[0].total_duration
        });
      });
  }

  renderSelectedSetlist() {
    let songsInList = this.state.songs;
    if (this.state.songs.length > 0) {
    }
    let songTags = [];
    for (let i = 0; i < songsInList.length; i++) {
      songTags.push(<p><span className="purple">{songsInList[i].title}:</span> <span id="green-nav">{songsInList[i].artist}</span>, <span className="gold">{songsInList[i].duration} min</span></p>);
    }

    return songTags;
  }

  render() {
    const bandId = this.props.match.params.bandId;
    const date = this.props.location.state.date;
    console.log('date is', date);

    return (
      <div>
        <NavBar bandId={bandId} />
        <h2 id="saved-setlist-title">{this.props.location.state.title}</h2>
        <h4>{NiceDate(date)}</h4>
        <section list="true" className="setlist-songs">
          {this.renderSelectedSetlist()}
        </section>
        <div id="saved-setlist-duration">
          <p id="saved-setlist-duration-text">Setlist length: <span className="purple">{this.state.setlistDuration} min</span></p>
        </div>
      </div>
    )
  }
}