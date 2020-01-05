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

  state = { error: null };

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
    console.log('handle submit setlist form');
    const { title, date } = e.target;
    const bandId = this.props.match.params.bandId;
    console.log(title, date);

    AuthApiService.postSetlist(bandId, {
      title: title.value,
      date: date.value
    })
      .then(() => {
        this.props.history.push(`/dashboard/band/${bandId}/setlists`);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }


  // handleSaveSetlist = () => {
  //   console.log('clicked save setlist');
  //   const authToken = TokenService.getAuthToken();
  //   const bandId = this.props.match.params.bandId;
  //   // const repertoire = this.context.bandRepertoire;

  //   const options = document.getElementById("right").childNodes

  //   let songsToSave = [];
  //   options.forEach((option) => {
  //     songsToSave.push({
  //       song_id: option.getAttribute("song_id"),
  //       band_id: option.getAttribute("band_id")
  //     });
  //   });
  //   console.log('CREATE songIdsArr is', songsToSave);
  //   const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists/create`;

  //   fetch(url, {
  //     method: "PATCH",
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //     body: JSON.stringify(songsToSave)
  //   })
  //     .then((res) => {
  //       console.log('res is', res);
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log('PATCH data response', data);
  //       this.props.history.push(`/dashboard/band/${bandId}/setlists`);
  //       //${bandId}/setlists

  //     })
  // }




  render() {
    const { error } = this.context;
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
            songs={this.context.bandRepertoire} />
        </form>
        {this.state.error
          ? <p className='red'>Something went wrong. Please try again</p>
          : <div></div>}


      </div >
    );
  }
}

export default CreateSetlist;