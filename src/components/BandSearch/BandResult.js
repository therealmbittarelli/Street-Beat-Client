import React, { Component } from 'react';
import { Button } from '../Utils/Utils';
import TokenService from '../../services/token-service.js'
import BandsListContext from '../../Context';
import config from '../../config';
import '../../routes/UserDashboard.css';

class BandResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bandToJoin: {}
    }
  }

  static contextType = BandsListContext;

  static defaultProps = {
    id: '',
    band_name: ''
  }

  handleSubmit = e => {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/bands/${this.props.id}/join`;

    fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bandToJoin: data
        })
      });
  }
  render() {
    return (
      <div>
        <div id="band-search-result">
          <p>{this.props.band_name}</p>
        </div >
        <Button id="join-band-button" type='submit'
          onClick={(e) => this.handleSubmit(e)}>Join band</Button>

      </div>
    );
  }
}

export default BandResult;