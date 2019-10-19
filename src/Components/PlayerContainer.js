import React, { Component } from "react";

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="playerContainer">
        {!this.props.activeVideoId && (
          // notify the user that they need to search a video to activate the player
          <p className="warning">Search a video to activate the player!</p>
        )}
        {this.props.invalidSearch && (
          // notify the user if their serach returned no results
          <p className="error">
            Error: Invalid search term, or no results were found.
          </p>
        )}

        <iframe title="YoutubePlayer" src={this.props.url} />

        {this.props.activeVideoId && (
          // only display the video metadata if a valid video is selected
          <div className="playerMetadata">
            <p id="title">
              <b>{this.props.activeVideoTitle}</b>
            </p>
            <p id="descr">{this.props.activeVideoDesc}</p>
            <p id="channel">
              <u>Channel</u>: {this.props.activeVideoChannel}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default PlayerContainer;
