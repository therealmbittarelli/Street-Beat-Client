import React, { Component } from 'react';
import "../ShuttleBox/ShuttleBox.css";
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
      <option key={this.props.id} className="shuttle-box-song" duration={this.props.duration} song_id={this.props.id} band_id={this.props.band_id}>
        {this.props.title}, {this.props.artist}, {this.props.duration}
      </option>
    );
  }
}

export default IndividualSong;