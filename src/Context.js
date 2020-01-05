import React, { Component } from 'react';
// import TokenService from './services/token-service.js'
// import config from './config';


const BandsListContext = React.createContext({
  setBandsList: () => { },
  setActiveBand: () => { },
  setBandMembers: () => { },
  setBandSetlists: () => { },
  setBandRepertoire: () => { },
  setError: () => { },
  clearError: () => { },
  bandsList: [],
  error: null,
  bandMembers: [],
  activeUser: '',
  activeBand: '',
  usersBands: [],
  bandSetlists: [],
  bandRepertoire: []
});

export default BandsListContext;

export class BandsListProvider extends Component {
  state = {
    bandsList: [],
    error: null,
    bandMembers: [],
    activeUser: '',
    activeBand: '',
    usersBands: [],
    bandSetlists: [],
    bandRepertoire: []
  };



  setUsersBands = (usersBands) => {
    this.setState({ usersBands })
  }

  setBandsList = (bandsList) => {
    this.setState({ bandsList })
  }

  setBandMembers = (bandMembers) => {
    this.setState({ bandMembers })
  }

  setActiveBand = (bandId) => {
    this.setState({
      activeBand: bandId
    })
  }

  setBandSetlists = (bandSetlists) => {
    this.setState({ bandSetlists })
  }

  setBandRepertoire = (bandRepertoire) => {
    this.setState({ bandRepertoire })
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
      activeBand: this.state.activeBand,
      activeUser: this.state.activeUser,
      bandRepertoire: this.state.bandRepertoire,
      bandMembers: this.state.bandMembers,
      bandsList: this.state.bandsList,
      bandSetlists: this.state.bandSetlists,
      error: this.state.error,
      usersBands: this.state.usersBands,
      clearError: this.clearError,
      setActiveBand: this.setActiveBand,
      setBandsList: this.setBandsList,
      setBandMembers: this.setBandMembers,
      setBandSetlists: this.setBandSetlists,
      setBandRepertoire: this.setBandRepertoire,
      setError: this.setError,
      setUsersBands: this.setUsersBands
    }
    return (
      <BandsListContext.Provider value={value}>
        {this.props.children}
      </BandsListContext.Provider>
    )
  }
}
