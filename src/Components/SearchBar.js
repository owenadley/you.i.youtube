import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // check if the user hits the enter button to submit search
  checkEnterPressed = keyPress => {
    if (keyPress.key === "Enter") {
      this.props.searchYoutube();
    }
  };

  render() {
    return (
      <div className="searchBar">
        <p>Search Youtube with any keyword:</p>
        <div className="inputSubmit">
          <input
            type="text"
            value={this.props.searchTerm}
            onChange={this.props.handleSearch}
            placeholder="Keyword(s), i.e 'I want to work at You.i!'"
            onKeyPress={this.checkEnterPressed}
          />
          <button type="submit" onClick={this.props.searchYoutube}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
