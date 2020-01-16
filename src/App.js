import React, { Component } from "react";
import PlayerContainer from "./Components/PlayerContainer";
import SearchBar from "./Components/SearchBar";

// declare constants for youtube api
const KEY = "";
const TYPE = "video";
const PART = "snippet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      activeVideoId: "",
      activeVideoTitle: "",
      activeVideoDesc: "",
      activeVideoChannel: "",
      invalidSearch: false
    };
  }

  componentDidMount() {}

  // save search term to state as user types it
  handleSearch = search => {
    this.setState({
      searchTerm: search.target.value
    });
  };

  // handle search using google youtube api and search term
  // save search results to state
  searchYoutube = () => {
    var searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&type=${TYPE}&part=${PART}&q=${
      this.state.searchTerm
    }`;
    fetch(searchUrl)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          invalidSearch: false,
          // automatically select the first returned result
          activeVideoId: data.items[0].id.videoId,
          activeVideoTitle: data.items[0].snippet.title,
          activeVideoDesc: data.items[0].snippet.description,
          activeVideoChannel: data.items[0].snippet.channelTitle
        });
      })
      .catch(error => {
        this.setState({ invalidSearch: true });
        console.error(error);
      });
  };

  render() {
    var url = this.state.activeVideoId
      ? `https://www.youtube.com/embed/${
          this.state.activeVideoId
        }?enablejsapi=1`
      : ``;

    return (
      <div className="App">
        <div className="header">
          <img className="logo" alt="you.i logo" src="./youi-logo.png" />
          <h1>
            <i>x Youtube</i>
          </h1>
        </div>

        {/* for demonstratation of components & props: */}
        <SearchBar
          searchTerm={this.state.searchTerm}
          searchYoutube={this.searchYoutube}
          handleSearch={this.handleSearch}
        />

        {/* for demonstration of components & props */}
        <PlayerContainer
          url={url}
          activeVideoId={this.state.activeVideoId}
          invalidSearch={this.state.invalidSearch}
          activeVideoTitle={this.state.activeVideoTitle}
          activeVideoDesc={this.state.activeVideoDesc}
          activeVideoChannel={this.state.activeVideoChannel}
        />
      </div>
    );
  }
}

export default App;
