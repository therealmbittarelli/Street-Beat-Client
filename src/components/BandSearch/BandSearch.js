import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import config from '../../config';
import TokenService from '../../services/token-service.js'
import BandResult from './BandResult';
import BandsListContext from '../../Context';


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
    console.log('this.state.searchTerm', this.state.searchTerm);
    console.log('etargetvalue is', e.target.value)
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

    // this ----------------
    let queryString = "?q=" + searchInput;
    const newUrl = url + queryString
    const authToken = TokenService.getAuthToken();

    fetch(newUrl, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ searchResults: data }));

  }

  renderSearchResults() {
    const results = this.state.searchResults;
    console.log('results is', results);
    if (results.length > 0) {
      return results.map(result =>
        (<BandResult
          band_name={result.band_name}
          id={result.id} />)
      )
    }
  }

  render() {
    const { error } = this.context;
    return (
      <form
        className='search'
        onSubmit={this.handleSubmit}>
        <label htmlFor='band_search_bar'>
          Search for a band that you're in
        </label>
        <Input
          name='band_search'
          type='text'
          id='band_search_bar'
          value={this.state.searchTerm}
          onChange={this.handleInput.bind(this)}
          placeholder='Fly By Brass Band'>
        </Input>
        <Button
          type='submit'>
          Search
        </Button>
        <section list="true" className="BandsList">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderSearchResults()}
        </section>
      </form>
    );
  }

}


export default BandSearch;