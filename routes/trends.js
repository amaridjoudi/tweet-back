var express = require("express");
var router = express.Router();
const Trend = require("../models/trends");
const { checkBody } = require("../modules/checkBody");

//------------------------------------------------------------------------------

router.get("/alltrend", (req, res) => {
  Trend.find()
    .populate("tweets")
    .then((data) => {
      if (data) {
        res.json({ result: true, trend: data });
      } else {
        res.json({ result: false, false: "no trend" });
      }
    });
});

//------------------------------------------------------------------------------

router.post("/newtrend", (req, res) => {
  if (!checkBody(req.body, ["name", "tweetID"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  Trend.findOne({ name: req.body.name }).then((data) => {
    if (data) {
      res.json({
        result: false,
        error: "trend allready exist",
        trendID: data._id,
      });
    } else {
      const newTrend = new Trend({
        name: req.body.name,
        tweets: [req.body.tweetID],
      });

      newTrend
        .save()
        .then(() => {
          res.json({ result: true });
        })
        .catch((error) => res.json({ result: false, error }));
    }
  });
});

//------------------------------------------------------------------------------
router.get("/onetrend/:trendID", (req, res) => {
  Trend.findOne({ _id: req.params.trendID })
    .populate("tweets")
    .then((data) => {
      if (data) {
        res.json({ result: true, trend: data });
      } else {
        res.json({ result: false, false: "no tweet" });
      }
    });
});

//------------------------------------------------------------------------------

router.patch("/tweettrend", (req, res) => {
  if (!checkBody(req.body, ["tweetID", "trendID"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Trend.findByIdAndUpdate(req.body.trendID, { tweets: req.body.tweetID }).then(
    (data) => {
      if (data) {
        res.json({ result: true, trend: data });
      } else {
        res.json({ result: false });
      }
    }
  );
});

module.exports = router;
