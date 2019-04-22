const nomics = require('../services/nomics');

// /api/changes?tickers=BTC,ETH

module.exports = app => {
  //return the daily hype
  app.get('/api/changes', async (req, res) => {
    const tickers = req.query.tickers;
    const changes = await nomics.getTickersPriceChange(tickers.split(','));
    res.send(changes);
  });
};
