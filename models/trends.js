const mongoose = require("mongoose");

const trensSchema = mongoose.Schema({
  name: String,
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "tweets" }],
});

const Trend = mongoose.model("trends", trensSchema);
module.exports = Trend;
