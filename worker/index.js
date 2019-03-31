const keys = require('./config/keys');

const options = {
  consumer_key: keys.twitterConsumerKey,
  consumer_secret: keys.twitterConsumerSecret,
  access_token_key: keys.twitterAccessTokenKey,
  access_token_secret: keys.twitterAccessTokenSecret,
};

const client = new require('twitter')(options);

function readStatuses(slug, count, cb) {
  const SCREEN_NAME = 'yurasherman';
  client.get(
    'lists/statuses',
    {
      slug,
      count,
      owner_screen_name: SCREEN_NAME,
    },
    (error, tweets) => {
      cb(error, tweets);
    }
  );
}

function cashTags(text) {
  const tags = text.match(/(^|\s+)\$[a-zA-Z]{2,6}/gm);
  // remove duplicate cashtags and trim whitespace
  return tags ? [...new Set(tags.map(tag => tag.trim()))] : [];
}

readStatuses('alt-fa', 20, (err, tweets) => {
  tweets.map(tweet => {
    console.log(`${cashTags(tweet.text)} : ${tweet.text}\n\n\n`);
  });
});
