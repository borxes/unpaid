/* global process __dirname  */

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('./models/Coin');
require('./models/Tweet');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 38 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

require('./routes/coinsRoute')(app);
require('./routes/dailyRoute')(app);

if (process.env.NODE_ENV === 'production') {
  // make sure Express will serve up production assests like main.js / css
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesn't recognize the route
  // so that React Router can handle it
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Server: listening on port ${PORT}`);
