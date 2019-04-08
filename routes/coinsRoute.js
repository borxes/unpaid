const mongoose = require('mongoose');
require('../models/Coin');
require('../models/Tweet');

const Coin = mongoose.model('coins');

module.exports = app => {
  //return top 100 coins
  app.get('/api/coins', async (req, res) => {
    const coins = await Coin.find({ rank: { $lt: 101, $gt: 0 } });
    res.send(coins);
  });
};
