const keys = require('./config/keys');

const options = {
  consumer_key: keys.twitterConsumerKey,
  consumer_secret: keys.twitterConsumerSecret,
  access_token_key: keys.twitterAccessTokenKey,
  access_token_secret: keys.twitterAccessTokenSecret,
};

const client = new require('twitter')(options);
const LIST_ID = 1056957229243490300;
const LIST_DEFI_ID = 1086892152649629700;

function readStatuses(slug, count, cb) {
  const SCREEN_NAME = 'yurasherman';
  client.get(
    'lists/statuses',
    {
      slug,
      count,
      owner_screen_name: SCREEN_NAME,
    },
    (error, tweets, res) => {
      cb(error, tweets);
    }
  );
}

readStatuses('alt-fa', 20, (err, tweets) => {
  tweets.map(tweet => {
    console.log(`${tweet.user.screen_name} : ${tweet.text}`);
  });
});
