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
      error: null
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
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ error: data.error });
        this.props.getBandsCallback();
        this.props.handleSetSearchState();
      });
  }

  handleSetState = () => {
    this.setState({
      error: null
    });
  }


  render() {
    const { error } = this.state;
    return (
      <div id="results-container">
        <div id="already-joined-error">
          {error && <p className="red">{'You\'ve already joined this band!'}</p>}
        </div>
        <div key={this.props.id} id="band-search-result">
          <p>{this.props.band_name}</p>
        </div >
        <Button id="join-band-button" type="submit"
          onClick={(e) => {
            this.handleSubmit(e);
            this.handleSetState();
          }}>Join band</Button>
      </div>
    );
  }
}

export default BandResult;