import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandMembers from '../components/BandMembers/BandMembers';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

class BandDashboard extends Component {

  // constructor(props) {
  //   super(props)


  // }
  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const bandId = this.props.match.params.bandId;
    const url = `${config.API_ENDPOINT}/bands/${bandId}/bandmembers`;

    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('data dashboard is', data);
        this.context.setBandMembers(data);

      });
  }

  renderBandMembers() {
    const bandMembers = this.context.bandMembers;
    return bandMembers.map(member =>
      <BandMembers
        key={member.id}
        first_name={member.first_name}
        last_name={member.last_name}
      />
    );
  }


  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;

    return (
      <div>
        <h2>Band dashboard</h2>
        <h3>Welcome! This space can be used for announcements, but for now it will serve to invite you to check out other members in this band, and navigate to the setlist builder to try out creating and saving down a setlist!</h3>
        <section list="true" className="members_list">
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderBandMembers()}
        </section>
        <p>Little comment</p>
        <Link to={`/dashboard/band/${bandId}/setlists`}>Setlist tool</Link>
      </div>
    );
  }
}

export default BandDashboard;