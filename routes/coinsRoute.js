const mongoose = require('mongoose');
require('../models/Coin');
require('../models/Tweet');

const Coin = mongoose.model('coins');

module.exports = app => {
  app.get('/api/coins', async (req, res) => {
    const coins = await Coin.find({});
    res.send(coins);
  });
};
