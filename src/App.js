import React, { Component } from "react";

// declare constants for youtube api call
const KEY = "AIzaSyBU5pOvliAQ5GQdXyqHcfeSGxJTJKtG8wQ";
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
      activeVideoChannel: ""
    };
  }

  componentDidMount() {}

  // handle change as user updates the search term by updating state
  handleSearch = search => {
    this.setState({
      searchTerm: search.target.value
    });
  };

  // handle search using google youtube api and entered search term
  // save search results to 'searchResults' state
  searchYoutube = () => {
    var searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&type=${TYPE}&part=${PART}&q=${
      this.state.searchTerm
    }`;
    console.log(searchUrl);
    fetch(searchUrl)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          // automatically select the first returned result
          activeVideoId: data.items[0].id.videoId,
          activeVideoTitle: data.items[0].snippet.title,
          activeVideoDesc: data.items[0].snippet.description,
          activeVideoChannel: data.items[0].snippet.channelTitle
        });
        console.log(data.items[0].snippet.title);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    var url = `https://www.youtube.com/embed/${this.state.activeVideoId}`;

    return (
      <div className="App">
        <div class="header">
          <img class="logo" alt="you.i logo" src="./youi-logo.png" />
          <h1>
            <i>x Youtube</i>
          </h1>
        </div>

        <div className="searchBar">
          <p>Search Youtube with any keyword:</p>
          <div class="inputSubmit">
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
              placeholder="keyword search, i.e 'you.i TV'"
            />
            <button type="submit" onClick={this.searchYoutube}>
              Search
            </button>
          </div>
        </div>

        <div class="playerContainer">
          <iframe title="YoutubePlayer" src={url} />
          <div class="playerMetadata">
            <p>{this.state.activeVideoTitle}</p>
            <p>{this.state.activeVideoDesc}</p>
            <p>{this.state.activeVideoChannel}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
