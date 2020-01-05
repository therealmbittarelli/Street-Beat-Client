import React, { Component } from 'react';
import './ShuttleBox.css';
import IndividualSong from '../IndividualSong/IndividualSong';

class ShuttleBox extends Component {


  static defaultProps = {
    bandId: '',
    songs: []
  }

  move_right = () => {
    var node = document.getElementById("left");
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].selected) {
        document.getElementById("right").appendChild(node.childNodes[i].cloneNode(true));
        node.removeChild(node.childNodes[i]);
        --i;
      }
    }
  }

  move_left = () => {
    var node = document.getElementById("right");
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].selected) {
        document.getElementById("left").appendChild(node.childNodes[i].cloneNode(true));
        node.removeChild(node.childNodes[i]);
        --i;
      }
    }
  }

  move_all_right = () => {
    var node = document.getElementById("left");
    while (node.childNodes.length > 0) {
      document.getElementById("right").appendChild(node.firstChild.cloneNode(true));
      node.removeChild(node.firstChild);
    }
  }

  move_all_left = () => {
    var node = document.getElementById("right");
    while (node.childNodes.length > 0) {
      document.getElementById("left").appendChild(node.firstChild.cloneNode(true));
      node.removeChild(node.firstChild);
    }
  }


  renderSongs = () => {
    const bandRepertoire = this.props.songs;
    // const bandId = this.props.match.params.bandid;
    console.log('bandRepertoire is', bandRepertoire);
    return bandRepertoire.map((song) => {

      return <IndividualSong
        id={song.id}
        title={song.title}
        artist={song.artist}
        duration={song.duration}
        band_id={song.band_id}
      />
    })
  }


  render() {

    return (
      <div id="shuttle-container" >
        <select multiple="multiple" id="left">
          {/* <option>item 0</option>
          <option>item 1</option>
          <option>item 2</option>
          <option>item 3</option> */}
          {this.renderSongs()}
        </select>
        <input type="button" value="<" onClick={this.move_left} />
        <input type="button" value="<<" onClick={this.move_all_left} />
        <input type="button" value=">>" onClick={this.move_all_right} />
        <input type="button" value=">" onClick={this.move_right} />
        <select multiple="multiple" id="right"></select>

      </div >
    );
  }
}

export default ShuttleBox;