import React, { Component } from 'react';
import BandMembers from '../components/BandMembers/BandMembers';
import NavBar from '../components/NavBar/NavBar';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import './BandDashboard.css';
import config from '../config';

class BandDashboard extends Component {

  // constructor(props) {
  //   super(props)
  // }
  static contextType = BandsListContext;

  static defaultProps = {
    band_name: ''
  }
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
        band_name={member.band_name}
      />
    );
  }

  renderBandName = () => {
    if (this.context.bandMembers.length > 0) {
      let bandName = this.context.bandMembers[0].band_name;
      return <h2>{bandName} Dashboard</h2>;
    }
  }

  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;
    return (
      <div id="band-dash-container">
        <NavBar bandId={bandId} />
        {this.renderBandName()}
        <h3 id="admin-announcements">Welcome! This space can be used for site-admin announcements, but for now it will serve to invite you to check out other members in this band, and navigate to the setlist builder to try out creating and saving down a setlist!</h3>
        <section list="true" className="members-list">
          Members
          {error
            ? <p className='red'>Something went wrong. Please try again</p>
            : this.renderBandMembers()}
        </section>
      </div>
    );
  }
}

export default BandDashboard;