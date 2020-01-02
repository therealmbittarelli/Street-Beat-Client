import React, { Component } from 'react';
import TokenService from './services/token-service.js'
import config from './config';


const BandsListContext = React.createContext({
  setBandsList: () => { },
  setBandMembers: () => { },
  setError: () => { },
  clearError: () => { },
  bandsList: [],
  error: null,
  bandMembers: [],
  activeUser: '',
  activeBand: '',
  usersBands: []
});

export default BandsListContext;

export class BandsListProvider extends Component {
  state = {
    bandsList: [],
    error: null,
    bandMembers: [],
    activeUser: '',
    activeBand: '',
    usersBands: []
  };

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const token = this.jwtDecode(authToken);
    console.log('token is ', token);
    this.setState({
      activeUser: token.payload.id
    });
    if (!authToken) {
      return this.props.history.push('/');
    } else {
      const url = `${config.API_ENDPOINT}/users/${token.payload.id}/mybands`;

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
          this.setState({
            usersBands: data
          })
        });
    }
  }

  jwtDecode = (t) => {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
  }

  setBandsList = bandsList => {
    this.setState({ bandsList })
  }

  setBandMembers = bandMembers => {
    this.setState({ bandMembers })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }


  render() {
    const value = {
      bandsList: this.state.bandsList,
      bandMembers: this.state.bandMembers,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBandsList: this.setBandsList,
      setBandMembers: this.setBandMembers,
      activeUser: this.state.activeUser,
      usersBands: this.state.usersBands,
      activeBand: this.state.activeBand
    }
    return (
      <BandsListContext.Provider value={value}>
        {this.props.children}
      </BandsListContext.Provider>
    )
  }
}
