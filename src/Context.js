import React, { Component } from 'react';

const BandsListContext = React.createContext({
  setBandsList: () => { },
  setError: () => { },
  clearError: () => { },
  bandsList: [],
  error: null
});

export default BandsListContext;

export class BandsListProvider extends Component {
  state = {
    bandsList: [],
    error: null
  };

  setBandsList = bandsList => {
    this.setState({ bandsList })
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
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setBandsList: this.setBandsList
    }
    return (
      <BandsListContext.Provider value={value}>
        {this.props.children}
      </BandsListContext.Provider>
    )
  }
}
