import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BandMembers from '../components/BandMembers/BandMembers';
// import { Button } from '../components/Utils/Utils';
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

  // goBack = () => {
  //   console.log('this.history', this.props.history.goBack());
  //   this.props.history.goBack();

  // }

  render() {
    const { error } = this.context;
    const bandId = this.props.match.params.bandId;

    return (
      <div>
        <h2>{this.props.location.state.band_name} Dashboard</h2>
        <NavBar bandId={bandId} />
        {/* <Button
          type="submit"
          onClick={this.goBack}>Back</Button> */}
        <h3>Welcome! This space can be used for admin announcements, but for now it will serve to invite you to check out other members in this band, and navigate to the setlist builder to try out creating and saving down a setlist!</h3>
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