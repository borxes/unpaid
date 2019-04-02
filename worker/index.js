const mongoose = require('mongoose');
const async = require('async');
const keys = require('./config/keys');
const twitter = require('./services/twitService');
require('./models/Tweet');

const STATUSES_PER_REQ = 10;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const Tweet = mongoose.model('tweets');

const processTweet = async tweet => {
  const coins = twitter.cashTags(tweet.text);
  if (coins.length < 1) return; // do nothing with tweets that don't mention a coin
  const existingTweet = await Tweet.findOne({ id: tweet.id_str });
  if (existingTweet) {
    console.log(`Tweet ID ${tweet.id_str} is already in the db`);
    console.log(existingTweet);
    console.log('----------------------------------');
  } else {
    console.log(`Process tweet ID ${tweet.id_str}`);
    const savedTweet = await new Tweet({
      text: tweet.text,
      id: tweet.id_str,
      trader: tweet.user.screen_name,
      coins: twitter.cashTags(tweet.text),
    }).save();
    console.log(`Saved to db: ${JSON.stringify(savedTweet)}`);
  }
};

const main = async () => {
  const latestId = await Tweet.latestId();
  console.log(latestId);
  twitter
    .readStatuses(keys.slug, STATUSES_PER_REQ, latestId)
    .then(tweets => {
      console.log(`Received ${tweets.length} tweets`);
      async.each(tweets, processTweet, () => {
        mongoose.connection.close();
      });
    })
    .catch(err => {
      console.log(err);
    });
};

main();
