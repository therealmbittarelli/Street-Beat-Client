import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

export default class SelectedSetlist extends Component {

  constructor(props) {
    super(props)

    this.state = {
      songs: []
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
    // const setlistId = this.props.match.params.setlistId;
    console.log('this.setlist id: ', this.props.location.state.setlist_id);
    const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists/${setlistId}`;
    console.log('band dash endpoint is', url)

    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('data SelectedSetlist is', data[1].title);
        this.setState({ songs: data });
      });
  }

  renderSelectedSetlist() {
    let songsInList = this.state.songs;
    if (this.state.songs.length > 0) {
      console.log('songsinlist is', this.state.songs[1]);
    }
    let songTags = [];
    for (let i = 0; i < songsInList.length; i++) {
      songTags.push(<p>{songsInList[i].title} {songsInList[i].artist} {songsInList[i].duration}</p>);
    }
    return songTags;
  }


  render() {
    // const { error } = this.context;

    return (
      <div>
        <h2>{this.props.location.state.title}</h2>
        <h4>{this.props.location.state.date}</h4>
        <section list="true" className="setlist-songs">
          {this.renderSelectedSetlist()}
          {/* {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderSelectedSetlist()} */}
        </section>
      </div>
    )
  }
}