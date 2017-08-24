import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import youtubeSearch from 'youtube-api-search';
const API_KEY = process.env.API_KEY;

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = { videos: [] };

    youtubeSearch({key: API_KEY, term: 'shiba inu' }, (videos) => {
      this.setState({ videos });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
