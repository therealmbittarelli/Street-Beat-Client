import React, { Component } from 'react';
import { Button, Input } from '../components/Utils/Utils';
import BandsListContext from '../Context';
import ShuttleBox from '../components/ShuttleBox/ShuttleBox';
import TokenService from '../services/token-service.js'
import AuthApiService from '../services/auth-api-service';
import config from '../config';

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
    console.log(title.value, date.value);

    AuthApiService.postSetlist(bandId, {
      title: title.value,
      date: date.value
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
      return parseInt(element, 10)
    })

    let totalDuration = () => {
      console.log('bandrep', bandRepDurationArrNum);
      const reducer = (acc, cur) => acc + cur;
      return bandRepDurationArrNum.reduce(reducer);
    }
    console.log('totalduration is', totalDuration())
    this.setState({
      setlistDuration: totalDuration()
    });
  }

  render() {
    // const { error } = this.context;
    const bandId = this.props.match.params.bandid;


    return (
      <div id="create-setlist-tool" >
        <h2>New Setlist Time</h2>
        <form
          className='create-setlist-form'
          onSubmit={this.handleSubmit}
        >
          <Button
            type="submit"
          >
            Save new setlist
        </Button>
          <Button type="submit">Add song</Button>
          <div id="title-container">
            <label htmlFor='title'>Name your setlist
          <Input
                name='title'
                type="text"
                required
                id='title' />
            </label>
          </div>
          <div id="date-container">
            <label htmlFor='date'>Date of gig/event
          <Input
                name='date'
                type="text"
                required
                id='date' />
            </label>
          </div>
          <ShuttleBox
            bandId={bandId}
            songs={this.context.bandRepertoire}
            durationCounter={this.setlistDurationCounter} />
        </form>
        {this.state.error
          ? <p className='red'>Something went wrong. Please try again</p>
          : <div></div>}
        <p>Setlist duration: {this.state.setlistDuration} </p>


      </div >
    );
  }
}

export default CreateSetlist;