import React, { Component } from 'react';
import nextId from 'react-id-generator';
// import Context from '../../Context';
import PropTypes from 'prop-types';

class AddSetlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: {
        value: "",
        touched: false
      },
      title: {
        value: "",
        touched: false
      },
      date: {
        value: "",
        touched: false
      },
      error: null,
      baseURL: 'http://localhost:8000/setlists'
    }
  }

  // static contextType = Context;

  render() {
    return (
      <p>wow!</p>
    )
  }


} //this is the end

AddSetlist.propTypes = {

}

export default AddSetlist;