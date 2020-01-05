import React, { Component } from 'react';
// import Draggable from 'react-draggable';


class IndividualSong extends Component {
  // constructor(props) {
  //   super(props)

  // }

  static defaultProps = {
    id: '',
    title: '',
    artist: '',
    duration: '',
    band_id: ''
  }



  render() {

    return (
      <option song_Id={this.props.id} band_Id={this.props.band_id}>
        {this.props.title}, {this.props.artist}, {this.props.duration}
      </option>
    );
  }
}

export default IndividualSong;