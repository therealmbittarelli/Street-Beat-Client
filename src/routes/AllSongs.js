import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Input, Button } from '../components/Utils/Utils';
import NavBar from '../components/NavBar/NavBar';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';
import AuthApiService from '../services/auth-api-service';


export default class AllSongs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      error: null
    }
  }

  static contextType = BandsListContext;

  static defaultProps = {
    match: ''
  }

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const url = `${config.API_ENDPOINT}/bands/${bandId}/songs`;

    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ songs: data });
      });
  }

  renderBandRepertoire = () => {
    const allSongs = this.state.songs;

    let songTags = [];
    for (let i = 0; i < allSongs.length; i++) {
      songTags.push(<div key={allSongs[i].id} className="repertoire-song"><p>Title: {allSongs[i].title}<br />Artist: {allSongs[i].artist}<br /> Song length: {allSongs[i].duration} min</p></div>);
    }
    return songTags;
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit song form');
    console.log('e.target is', e.target);
    const { title, artist, duration } = e.target;
    const bandId = this.props.match.params.bandId;


    this.setState({ error: null });
    console.log(title, artist, duration);

    AuthApiService.postSong(bandId, {
      title: title.value,
      artist: artist.value,
      duration: duration.value
    })
      .then((data) => {
        console.log('song is', data);
        title.value = '';
        artist.value = '';
        duration.value = '';
        this.setState({ songs: [...this.state.songs, data] })
        console.log('data is', data);

      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;
    return (
      <div>
        <h2>Repertoire</h2>
        <NavBar bandId={bandId} />
        <div role='alert'>
          {error && <p className='red'>{'Something went wrong. Please try again.'}</p>}
        </div>
        <section list="true" className="band-repertoire">
          {this.renderBandRepertoire()}
        </section>
        <section id="add-song-container">
          <h3>Add a song</h3>
          <form
            id="add-new-song"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="song-title">Title</label>
            <Input
              type="text"
              name="song-title"
              id="song-title"
              placeholder="War">
            </Input>

            <label htmlFor="song-artist">Artist</label>
            <Input
              type="text"
              name="song-artist"
              id="song-artist"
              placeholder="Hypnotic Brass Ensemble">
            </Input>

            <label htmlFor="song-length">Duration</label>
            <Input
              type="text"
              name="song-duration"
              id="song-duration"
              placeholder="whole numbers only, eg: 3">
            </Input>
            <Button
              type="submit"
            >
              Submit
            </Button>
          </form>
        </section>
      </div>
    );
  }
}


