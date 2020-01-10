import React, { Component } from 'react';
import IndividualSong from '../IndividualSong/IndividualSong';
import './ShuttleBox.css';

class ShuttleBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  static defaultProps = {
    bandId: '',
    songs: [],
    durationCounter: () => { }
  }

  move_up = () => {
    const rightColumn = document.getElementById('right');
    for (let i = 0; i < rightColumn.childNodes.length; i++) {
      if (rightColumn.childNodes[i].selected && i > 0) {
        rightColumn.insertBefore(rightColumn.childNodes[i], rightColumn.childNodes[i - 1]);
        break;
      }
    }
  }

  move_down = () => {
    const rightColumn = document.getElementById('right');
    for (let i = 0; i < rightColumn.childNodes.length; i++) {
      if (rightColumn.childNodes[i].selected && i < rightColumn.childNodes.length - 1) {
        rightColumn.insertBefore(rightColumn.childNodes[i + 1], rightColumn.childNodes[i]);
        break;
      }
    }
  }

  move_right = () => {
    const node = document.getElementById('left');
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].selected) {
        document.getElementById('right').appendChild(node.childNodes[i].cloneNode(true));
        node.removeChild(node.childNodes[i]);
        this.props.durationCounter();
        --i;
      }
    }
  }

  move_left = () => {
    const node = document.getElementById('right');
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].selected) {
        document.getElementById('left').appendChild(node.childNodes[i].cloneNode(true));
        node.removeChild(node.childNodes[i]);
        this.props.durationCounter();
        --i;
      }
    }
  }

  move_all_right = () => {
    const node = document.getElementById('left');
    while (node.childNodes.length > 0) {
      document.getElementById('right').appendChild(node.firstChild.cloneNode(true));
      node.removeChild(node.firstChild);
      this.props.durationCounter();
    }
  }

  move_all_left = () => {
    const node = document.getElementById('right');
    while (node.childNodes.length > 0) {
      document.getElementById('left').appendChild(node.firstChild.cloneNode(true));
      node.removeChild(node.firstChild);
      this.props.durationCounter();
    }
  }


  renderSongs = () => {
    const bandRepertoire = this.props.songs;
    return bandRepertoire.map((song) => {

      return <IndividualSong
        id={song.id}
        key={song.id}
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
        <section id="left-shuttle-container">
          Repertoire list
          <br />
          <select className="left_select" multiple="multiple" id="left">
            {this.renderSongs()}
          </select>
        </section>
        <p id="controls-transfer-text">Move songs into and out of the setlist box:</p>
        <section id="controls-transfer">
          <input type="button" className="controls" value=">" onClick={this.move_right} />
          <br />
          <input type="button" className="controls" value="<" onClick={this.move_left} />
          <br />
          <input type="button" className="controls" value=">>" onClick={this.move_all_right} />
          <br />
          <input type="button" className="controls" value="<<" onClick={this.move_all_left} />
        </section>
        <p id="controls-reorder-text">Reorder songs in your setlist:</p>
        <section id="controls-reorder">
          <input type="button" id="up" className="controls" value="^" onClick={this.move_up} />
          <br />
          <input type="button" className="controls" value="V" onClick={this.move_down} />
        </section>
        <section id="right-shuttle-container">
          Setlist*
          <br />
          <select multiple="multiple" id="right"></select>
        </section>
      </div >
    );
  }
}

export default ShuttleBox;