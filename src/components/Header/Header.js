import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink = () => {
    return (
      <div className='logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink = () => {
    return (
      <div className='not-logged-in'>
        <Link
          to='/register'>
          Register
        </Link>
        <Link
          to='/'>
          Log in
        </Link>

      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <section id="login-register-links-container">
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </section>
        <h1>
          <Link
            id="street-beat-header"
            to='/dashboard/user'>
            <span className="purple">St</span><span className="gold">re</span><span id="green">et</span><span className="gold">Be</span><span className="purple">at</span>
          </Link>
        </h1>
      </nav>
    )
  }
}