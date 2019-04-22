import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import GlobalTable from './components/GlobalTable';

import { stripCashtag } from './lib/helpers';

class App extends Component {
  state = {
    dailyTokens: [],
  };

  async componentDidMount() {
    // axios.get('/api/daily').then(data => {
    //   this.setState({ dailyTokens: data.today });
    //   console.log(this.state.dailyTokens);
    // });
    const response = await axios.get('/api/daily');
    const todaysSignals = response.data.today;
    console.log(`Received daily signals ${todaysSignals}`);
    const todaysCoins = todaysSignals.map(currency =>
      stripCashtag(currency[0])
    );

    this.setState({
      dailyTokens: todaysSignals.map(currency => [
        stripCashtag(currency[0]),
        currency[1],
      ]),
    });
    const req = `/api/changes?tickers=${todaysCoins.join(',')}`;
    console.log(`Change request: ${req}`);
    const todaysChanges = await axios.get(req);
    console.log(todaysChanges.data);
    this.setState({
      dailyChanges: todaysChanges.data,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Daily Hype</h2>
        <GlobalTable
          signals={this.state.dailyTokens}
          changes={this.state.dailyChanges}
          header={'Daily Signals'}
        />
      </div>
    );
  }
}

export default App;
