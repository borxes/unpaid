import React, { Component } from 'react';
import axios from 'axios';

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
        <header>Daily Hype</header>
        {this.state.dailyTokens.map(row => (
          <div key={row[0]}>
            Token: {row[0]} Mentions: {row[1]}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
