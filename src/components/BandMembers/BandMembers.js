import React, { Component } from 'react';
import BandsListContext from '../../Context';
import config from '../../config';


export default class BandMembers extends Component {
  static contextType = BandsListContext;

  //getMembers not working code yet
  getMembers() {
    return fetch(`${config.API_ENDPOINT}/bands/:band_id`, {
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
    // BandsApiService.getBands() need to build

    this.getMembers()
      .then(this.context.setBandMembers)
      .catch(this.context.setError)
  }




  render() {
    const { error } = this.context.state
    return (
      <section list="true" className='BandMembers'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderBandMembers()}
      </section>
    )
  }
}
