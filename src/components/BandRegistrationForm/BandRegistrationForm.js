import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import '../../routes/RegisterBand.css';


export default class BandRegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    const { band_name, city, state, country, description } = e.target;
    this.setState({ error: null });

    AuthApiService.postBand({
      band_name: band_name.value,
      city: city.value,
      state: state.value,
      country: country.value,
      description: description.value
    })
      .then((band) => {
        band_name.value = '';
        city.value = '';
        state.value = '';
        country.value = '';
        description.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='BandRegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{'Something went wrong. Please try again.'}</p>}
        </div>
        <div className='first_name'>
          <label htmlFor='BandRegistrationForm_band_name'>
            Band name <Required />
          </label>
          <Input
            name='band_name'
            type='text'
            required
            id='BandRegistrationForm_band_name'>
          </Input>
        </div>
        <div className='city'>
          <label htmlFor='BandRegistrationForm_city'>
            City
          </label>
          <Input
            name='city'
            type='text'
            id='BandRegistrationForm_city'>
          </Input>
        </div>
        <div className='state'>
          <label htmlFor='BandRegistrationForm_state'>
            State
          </label>
          <Input
            name='state'
            type='text'
            id='BandRegistrationForm_state'>
          </Input>
        </div>
        <div className='country'>
          <label htmlFor='BandRegistrationForm_country'>
            Country <Required />
          </label>
          <Input
            name='country'
            type='text'
            required
            id='BandRegistrationForm_country'>
          </Input>
        </div>
        <div className='description'>
          <label htmlFor='BandRegistrationForm_description'>
            Description <Required />
          </label>
          <Input
            name='description'
            type='text'
            required
            id='BandRegistrationForm_description'>
          </Input>
        </div>
        <Button
          id="band-register-button"
          type='submit'>
          Register
        </Button>
        <Link
          id="band-register-back"
          to={'/dashboard/user'}>
          Back
        </Link>
      </form>
    )
  }
}
