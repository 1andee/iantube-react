import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import youtubeSearch from 'youtube-api-search';
const API_KEY = process.env.API_KEY;

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('shiba inu');
  }

  videoSearch = (term) => {
    youtubeSearch({key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

    return (
      <div>
        <div id="header">
          <h2>Ian<span id="tube">Tube</span></h2>
          <SearchBar onSearchTermChange={videoSearch} />
        </div>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
