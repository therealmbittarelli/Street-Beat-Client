import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersBands from './UsersBands';
import BandsListContext from '../Context';
import BandSearch from '../components/BandSearch/BandSearch';
// src/Context.js
class UserDashboard extends Component {
  static contextType = BandsListContext;

  renderBands() {
    console.log('bandslistcontext.error is', this.context.error);
    const { bandsList = [] } = this.context;
    return bandsList.map(band =>
      <UsersBands
        key={band.id}
        band={band}
      />
    );
  }

  renderResults() {

  }


  render() {
    console.log('this.bandslistcontext is', this.context);
    const { error } = this.context;

    return (
      <div>
        <h2>User dashboard</h2>
        <section list="true" className="BandsList">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderBands()}
        </section>
        <BandSearch
          onSearch={this.renderResults} />
        <p>Don't see your band listed?</p>
        <Link to={'/registerband'}>Add it!</Link>
      </div>
    );
  }
}

export default UserDashboard;