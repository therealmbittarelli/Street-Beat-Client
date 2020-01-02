import React, { Component } from 'react';
import { Button } from '../Utils/Utils';
import TokenService from '../../services/token-service.js'
import BandsListContext from '../../Context';
import config from '../../config';

class BandResult extends Component {


  static contextType = BandsListContext;

  static defaultProps = {
    id: '',
    band_name: ''
  }

  handleSubmit = e => {
    console.log('clicked join band');
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/bandmembers`;

    fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        band_id: this.props.id,
        user_id: this.context.activeUser
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('POST req to add member to band successful:', data);

      });
  }
  render() {
    return (
      <div>
        <p>{this.props.band_name}</p>
        <Button type='submit'
          onClick={(e) => this.handleSubmit(e)}>Join band</Button>
      </div >
    );
  }
}

export default BandResult;