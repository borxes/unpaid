const mongoose = require('mongoose');
const { Schema } = mongoose;
const signalSchema = require('./Signal');
const traderSchema = require('./Trader');

// TODO: expland schema to to Coin and Trader subdocuments

const tweetSchema = new Schema({
  text: String,
  id: String,
  //coins: [signalSchema],
  coins: [String], // for simplicity
  //trader: traderSchema,
  trader: String, // for simplicty
});

mongoose.model('tweets', tweetSchema);
