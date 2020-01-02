import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandMembers from '../components/BandMembers/BandMembers';
import TokenService from '../services/token-service.js'
import BandsListContext from '../Context';
import config from '../config';

class BandDashboard extends Component {

  // constructor(props) {
  //   super(props)

  //   this.state = ({
  //     bandMembers: []
  //   })
  // }
  static contextType = BandsListContext;

  componentDidMount() {
    const authToken = TokenService.getAuthToken();
    const url = `${config.API_ENDPOINT}/bands/${this.context.activeUser}`;

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
    console.log('bandMembers on banddashboard is', bandMembers);
    return bandMembers.map(member =>
      <BandMembers
        key={member.id}
        name={member.first_name}
      />
    );
  }


  render() {
    console.log('this.bandslistcontext is', this.context);
    const { error } = this.context;

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
        <Link to={'/dashboard/band/setlists'}>Setlist tool</Link>
      </div>
    );
  }
}

export default BandDashboard;