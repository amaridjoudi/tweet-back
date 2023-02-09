const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  texte: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Tweet = mongoose.model("tweets", tweetSchema);
module.exports = Tweet;
