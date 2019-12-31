import React, { Component } from 'react';
import BandsListContext from '../Context';
import config from '../config';


export default class ThingListPage extends Component {
  static contextType = BandsListContext;

  getBands() {
    return fetch(`${config.API_ENDPOINT}/user/bands`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }

  componentDidMount() {
    this.context.clearError();
    // ThingApiService.getThings()

    this.getBands()
      .then(this.context.setBandsList)
      .catch(this.context.setError)
  }



  render() {
    const { error } = this.context.state
    return (
      <section list="true" className='ThingListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderThings()}
      </section>
    )
  }
}
