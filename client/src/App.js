import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import GlobalTable from './components/GlobalTable';

class App extends Component {
  state = { dailyTokens: [] };

  componentDidMount() {
    // axios.get('/api/daily').then(data => {
    //   this.setState({ dailyTokens: data.today });
    //   console.log(this.state.dailyTokens);
    // });
    axios.get('/api/daily').then(response => {
      this.setState({
        dailyTokens: response.data.today,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <header>Daily Hype</header>
        <GlobalTable
          signals={this.state.dailyTokens}
          header={'Daily Signals'}
        />
      </div>
    );
  }
}

export default App;
