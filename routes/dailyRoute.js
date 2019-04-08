const mongoose = require('mongoose');
const moment = require('moment');
require('../models/Coin');
require('../models/Tweet');

const Coin = mongoose.model('coins');
const Tweet = mongoose.model('tweets');

// converts object like  {eth: 2, btc: 4, eos: 1} into [{btc: 4}, {eth: 2}, {eos: 1}]
const sortSignals = signalsObj => {
  const entries = Object.entries(signalsObj);
  entries.sort((a, b) => b[1] - a[1]);
  return entries;
};

const getDailySignals = async () => {
  const tweets = await Tweet.find({
    date: {
      $gt: moment()
        .startOf('day')
        .toDate(),
    },
  });
  const coins = {};
  tweets.forEach(tweet => {
    tweet.coins.forEach(coin => {
      if (coins[coin]) coins[coin]++;
      else coins[coin] = 1;
    });
  });
  return sortSignals(coins);
};

const getAllTimeSignals = async () => {
  const tweets = await Tweet.find({});
  const coins = {};
  tweets.forEach(tweet => {
    tweet.coins.forEach(coin => {
      if (coins[coin]) coins[coin]++;
      else coins[coin] = 1;
    });
  });
  return sortSignals(coins);
};

module.exports = app => {
  //return the daily hype
  app.get('/api/daily', async (req, res) => {
    const todaySignals = await getDailySignals();
    const allTimeSignals = await getAllTimeSignals();
    res.send({
      today: todaySignals,
      allTime: allTimeSignals,
    });
  });
};
