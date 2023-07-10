const express = require('express');
const verifyToken  = require('../verifyToken.js');
const router = express.Router();
const { createTweet, deleteTweet, likeOrDislike, 
    commentOnTweet, getAllTweets, getUserTweets,
    getExploreTweets } = require('../controllers/tweet.js');

router.post('/', /*verifyToken,*/  createTweet);

router.delete('/:id', /*verifyToken,*/ deleteTweet);

router.put('/:id/like', likeOrDislike);

//get all timeline tweets => My tweets + tweets whoom i follow
router.get('/timeline/:id', getAllTweets );

//get user Tweets only
router.get('/user/all/:id', getUserTweets );

//explore tweets which will have all the tweets
router.get('/explore', getExploreTweets );


module.exports = router;