import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../components/Utils/Utils';
import BandsListContext from '../Context';
import NavBar from '../components/NavBar/NavBar';
import ShuttleBox from '../components/ShuttleBox/ShuttleBox';
import TokenService from '../services/token-service.js'
import AuthApiService from '../services/auth-api-service';
import config from '../config';
import './CreateSetlist.css';

class CreateSetlist extends Component {
  state = {
    error: null,
    setlistDurationArr: [],
    setlistDuration: ''
  };

  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const url = `${config.API_ENDPOINT}/bands/${bandId}/songs`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.context.setBandRepertoire(data);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, date } = e.target;
    const bandId = this.props.match.params.bandId;
    const setlistDuration = this.state.setlistDuration;

    AuthApiService.postSetlist(bandId, {
      title: title.value,
      date: date.value,
      total_duration: setlistDuration
    })
      .then((res) => {
        this.props.history.push(`/dashboard/band/${bandId}/setlists`);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  }

  setlistDurationCounter = () => {
    const selectedSongs = document.getElementById('right').childNodes
    let bandRepDurationArr = [];
    selectedSongs.forEach((song) => {
      bandRepDurationArr.push(
        song.getAttribute('duration')
      );
    });
    let bandRepDurationArrNum = bandRepDurationArr.map((element) => {
      return parseInt(element, 10);
    })

    let totalDuration = () => {
      if (bandRepDurationArrNum.length > 0) {
        const reducer = (acc, cur) => acc + cur;
        return bandRepDurationArrNum.reduce(reducer);
      }
    }
    this.setState({
      setlistDuration: totalDuration()
    });
  }

  render() {
    const { error } = this.state;
    const bandId = this.props.match.params.bandId;
    return (
      <div id="create-setlist-tool" >
        <NavBar bandId={bandId} />
        <h2>New Setlist</h2>
        <form
          className="create-setlist-form"
          onSubmit={this.handleSubmit}
        >
          <div id="title-container">
            <label htmlFor="title">Name your setlist*
          <Input
                name="title"
                type="text"
                required
                id="title"
                placeholder="PRONK! Fest"
              />
            </label>
          </div>
          <div id="date-container">
            <label htmlFor="date">Date of gig/event*
          <Input
                name="date"
                type="text"
                required
                id="date"
                placeholder="dd/mm/yyyy"
              />
            </label>
          </div>
          <div id="shuttle-instructions">
            Use the controls below to move tunes between boxes and reorder your setlist*
        <br />
          </div>
          <ShuttleBox
            bandId={bandId}
            songs={this.context.bandRepertoire}
            durationCounter={this.setlistDurationCounter} />
          <section id="counter-text">
            {error
              ? <p className="red">Something went wrong. Please try again</p>
              : <div></div>}
            {this.state.setlistDuration > 0 && <p>Setlist duration: <span className="purple">{this.state.setlistDuration} min</span></p>}
          </section>
          <Button
            id="create-setlist-submit"
            type="submit"
          >
            Save new setlist
        </Button>
          <br />
          <div id="add-song-button-container">
            <p id="add-song-text">Have a new tune to add to your repertoire?</p>
            <Link
              id="create-setlist-add-song"
              to={`/dashboard/band/${bandId}/songs`}>
              Add song
          </Link>
          </div>
        </form>
      </div >
    );
  }
}

export default CreateSetlist;