import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';


class LandingPage extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='LandingPage_logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='LandingPage_not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div>
        <nav className='LandingPage'>
          <h2>
            <Link to='/'>
              {/* <FontAwesomeIcon className='blue' icon='gift' /> */}
              {' '}
              CATS AND CATS
            </Link>
          </h2>
          <span className='LandingPage_tagline'>Street band bizniz</span>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </div>
    )
  }

}

export default LandingPage;