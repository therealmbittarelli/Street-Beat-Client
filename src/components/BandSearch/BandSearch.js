import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import config from '../../config';
import TokenService from '../../services/token-service.js'
import BandResult from './BandResult';
import BandsListContext from '../../Context';
import '../../routes/UserDashboard.css';


class BandSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      searchTerm: '',
      error: null
    }
  }

  static contextType = BandsListContext;

  handleInput(e) {
    e.preventDefault();
    this.setState({ searchTerm: e.target.value });
  }

  formatQueryString(params) {
    const formatString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

    return formatString.join('&')
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ error: null });
    const searchInput = this.state.searchTerm;
    const url = `${config.API_ENDPOINT}/bands`;

    // create a query string with the band being searched for
    let queryString = "?q=" + searchInput;
    const newUrl = url + queryString
    const authToken = TokenService.getAuthToken();

    fetch(newUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ searchResults: data }));

  }

  handleSetSearchState = (err) => {
    this.setState({
      error: err
    })
  }

  renderSearchResults() {
    const results = this.state.searchResults;
    if (results.length > 0) {
      return results.map(result =>
        (<BandResult
          key={result.id}
          getBandsCallback={this.props.getBandsCallback}
          band_name={result.band_name}
          id={result.id}
          handleSetSearchState={this.handleSetSearchState}
        />)
      )
    }
  }

  render() {
    const { error } = this.state;
    return (
      <form
        className="search"
        onSubmit={this.handleSubmit}>
        <label id="band-search-text" htmlFor="band_search_bar">
          Did you join or start a new band? <br /> Search to see if it's registered on Street Beat!
        </label>
        <Input
          name="band_search"
          type="text"
          id="band_search_bar"
          value={this.state.searchTerm}
          onChange={this.handleInput.bind(this)}
          placeholder="Fly By Brass Band">
        </Input>
        <Button
          id="band-search-button"
          type="submit"
          onClick={this.handleSetSearchState}>
          Search
        </Button>
        <section list="true" id="bands-list">
          {error
            ? <p className="red">Something went wrong. Please try again</p>
            : this.renderSearchResults()}
        </section>
      </form>
    );
  }
}


export default BandSearch;