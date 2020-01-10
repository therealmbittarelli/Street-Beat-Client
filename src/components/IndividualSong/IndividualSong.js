import React, { Component } from 'react';
import "../ShuttleBox/ShuttleBox.css";

class IndividualSong extends Component {
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
        {this.props.title}: {this.props.artist}, {this.props.duration} min
      </option>
    );
  }
}

export default IndividualSong;