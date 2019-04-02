const mongoose = require('mongoose');
const async = require('async');
const keys = require('./config/keys');
const twitter = require('./services/twitService');
require('./models/Tweet');

const STATUSES_PER_REQ = 14;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const Tweet = mongoose.model('tweets');

let latestTweetId = '0'; // global variable

const processTweet = async tweet => {
  if (tweet.id_str > latestTweetId) {
    latestTweetId = tweet.id_str;
  }
  const coins = twitter.cashTags(tweet.text);
  if (coins.length < 1) return; // do nothing with tweets that don't mention a coin
  const existingTweet = await Tweet.findOne({});
  if (existingTweet) {
    console.log(`Tweet ID ${tweet.id_str} is already in the db`);
  } else {
    const savedTweet = await new Tweet({
      text: tweet.text,
      id: tweet.id_str,
      trader: tweet.user.screen_name,
      coins: twitter.cashTags(tweet.text),
    }).save();
    console.log(`Saved to db: ${JSON.stringify(savedTweet)}`);
  }
};

twitter
  .readStatuses(keys.slug, STATUSES_PER_REQ)
  .then(tweets => {
    console.log(`Received ${tweets.length} tweets`);
    async.each(tweets, processTweet, () => {
      mongoose.connection.close();
    });
  })
  .catch(err => {
    console.log(err);
  });
