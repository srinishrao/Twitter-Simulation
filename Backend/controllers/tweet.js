const Tweet = require('../models/Tweet.js');
const { handleError } = require('../error.js');
const User = require('../models/User.js');

const createTweet = async (req, res, next) => {
    console.log(req.body);
    const newTweet = new Tweet(req.body);
    try {
        const tweet = await newTweet.save();
        res.status(200).json(tweet);
    } catch (err) {
        handleError(500, err);
    }
}

const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if(tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("tweet deleted");
        } else {
            handleError(500, err);
        }
    } catch (err) {
        handleError(500, err);
    }
}

const likeOrDislike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if(!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({ $push : { likes: req.body.id } });
            res.status(200).json("tweet has been liked");
        } else {
            await tweet.updateOne({ $pull : { likes: req.body.id } });
            res.status(200).json("tweet has been disliked");
        }
    } catch (err) {
        handleError(500, err);
    }
}

/*
const commentOnTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        await tweet.updateOne({ $push : { comments: req.body } });
        res.status(200).json(req.body);
    } catch (err) {
        handleError(500, err);
    }
}
*/

const getAllTweets = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser.id }).sort({
            createdAt: -1 
        });
        const followersTweets = await Promise.all
            (currentUser.following.map((followerId) => {
                return Tweet.find({ userId: followerId }).sort({
                    createdAt: -1
                });
            })
        );
    
        res.status(200).json( userTweets.concat(...followersTweets) ); 
    } catch (err) {
        handleError(500, err);
    }
}

const getUserTweets = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createdAt: -1,  //get all latest tweets on top
        });
    
        res.status(200).json( userTweets );
    } catch (err) {
        handleError(500, err);
    }
}

const getExploreTweets = async (req, res, next) => {
    try {
        const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
            likes: -1, //get tweets with most likes first
            createdAt: -1, 
        });
        res.status(200).json( exploreTweets );
    } catch (err) {
        handleError(500, err);
    }
}

module.exports = { createTweet, deleteTweet, likeOrDislike, 
    getAllTweets, getUserTweets, getExploreTweets };