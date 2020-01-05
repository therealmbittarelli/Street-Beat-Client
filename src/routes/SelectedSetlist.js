import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

export default class SelectedSetlist extends Component {

  // constructor(props) {
  //   super(props)
  // }

  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    // const setlistId = this.props.match.params.setlistId;
    console.log('this.props izzzz', this.props);
    const url = `${config.API_ENDPOINT}/bands/${bandId}/setlists/`;
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
        console.log('data dashboard is', data);
        this.context.setBandMembers(data);

      });
  }



  render() {
    console.log('key and band_name', this.props.key, this.props.title, this.props.date)
    const bandId = this.props.match.params.bandId;
    console.log('woohoo', bandId);

    return (
      <div key={this.props.id}>
        <p>worrrdss</p>
      </div>
    )
  }
}