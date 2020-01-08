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
  // constructor(props) {
  //   super(props)
  // }

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
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('data is', data);
        this.context.setBandRepertoire(data);
        console.log('repertoire is', this.context.bandRepertoire);

      });
  }



  handleSubmit = (e) => {
    e.preventDefault();

    const { title, date } = e.target;
    const bandId = this.props.match.params.bandId;
    const setlistDuration = this.state.setlistDuration;
    console.log(title.value, date.value);

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
    const selectedSongs = document.getElementById("right").childNodes
    let bandRepDurationArr = [];
    selectedSongs.forEach((song) => {
      bandRepDurationArr.push(
        song.getAttribute("duration")
      );
    });

    console.log('array of duration is', bandRepDurationArr)
    let bandRepDurationArrNum = bandRepDurationArr.map((element) => {
      return parseInt(element, 10);
    })

    let totalDuration = () => {
      console.log('bandrep', bandRepDurationArrNum);
      if (bandRepDurationArrNum.length > 0) {
        const reducer = (acc, cur) => acc + cur;
        return bandRepDurationArrNum.reduce(reducer);
      }
    }
    console.log('totalduration is', totalDuration())
    this.setState({
      setlistDuration: totalDuration()
    });
  }

  render() {
    // const { error } = this.context;
    const bandId = this.props.match.params.bandId;
    console.log('bandId is', bandId);


    return (
      <div id="create-setlist-tool" >
        <NavBar bandId={bandId} />
        <h2>New Setlist</h2>
        <form
          className='create-setlist-form'
          onSubmit={this.handleSubmit}
        >
          <Button
            id="create-setlist-submit"
            type="submit"
          >
            Save new setlist
        </Button>
          <Link
            id="create-setlist-add-song"
            to={`/dashboard/band/${bandId}/songs`}>
            Add song
              </Link>
          <div id="title-container">
            <label htmlFor='title'>Name your setlist*
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
            <label htmlFor='date'>Date of gig/event*
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
            Use the controls below to move tunes into the setlist box
        <br />
          </div>
          <ShuttleBox
            bandId={bandId}
            songs={this.context.bandRepertoire}
            durationCounter={this.setlistDurationCounter} />
        </form>
        <section id="counter-text">
          {this.state.error
            ? <p className='red'>Something went wrong. Please try again</p>
            : <div></div>}
          {this.state.setlistDuration > 0 && <p>Setlist duration: <span className="purple">{this.state.setlistDuration} min</span></p>}
        </section>

      </div >
    );
  }
}

export default CreateSetlist;