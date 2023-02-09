var express = require('express');
var router = express.Router();

const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

router.post('/newtweet', (req, res) => {
    if (!checkBody(req.body, ['userID', 'texte'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const newTweet = new Tweet({
        user: req.body.userID,
        texte: req.body.texte,
        like: []
    });

    newTweet.save().then(() => {
        res.json({ result: true });
    }).catch(error => res.json({ result: false, error}));
})

router.get('/alltweet', (req, res) => {
    Tweet.find().then(data => {
        if (data) {
            res.json({ result: true, tweets: data });
        } else {
            res.json({ result: false, error: 'No tweets' });
        }
    });
})

router.delete("/:tweetID", (req, res) => {
    if (!checkBody(req.body, ['tweetID'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    Tweet.deleteOne({ _id: req.params.tweetID }).then(deletedDoc => {
        if (deletedDoc.deletedCount > 0) {
            // document successfully deleted
            res.json({ result: true });
        } else {
            res.json({ result: false, error: "Tweet not found" });
        }
    });
});

router.patch('/newlike', (req, res) => {
    if (!checkBody(req.body, ['tweetID', 'userIDS'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    Tweet.findByIdAndUpdate(req.body.tweetID, {like: req.body.userIDS}).then(data => {
        if (data) {
            res.json({ result: true, tweet: data });
        } else {
            res.json({ result: false });
        }
    })
})

module.exports = router;