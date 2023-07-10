const User = require('../models/User.js');
const { handleError } = require('../error.js');
const bcrypt = require('bcryptjs');
const Tweet = require('../models/Tweet.js');


const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    if(req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, salt);;
    }
    if(req.params.id) {
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, 
                { 
                    $set: {...req.body}
                },
                { new: true }
            );
            res.status(200).json(updateUser);
        }catch(err) {
            next(err);
        }
    }else {
        return next(handleError(403, "You can only update your own account"));
    }
}

const deleteUser = async (req, res, next) => {
    if(req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            //When the user is deleted, we should also delete their tweets
            //await Tweet.remove({ userId: req.params.id });
            res.status(200).json("User deleted");
        }catch(err) {
            next(err);
        }
    }else {
        return next(handleError(403, "You can only delete your own account"));
    }
}

const followUser = async (req, res, next) => {
    try {
        //User you want to follow
        const user = await User.findById(req.params.id);
        //Current user
        const currentUser = await User.findById(req.body.id);

        if(!user.followers.includes(req.body.id)) {
            await user.updateOne({ 
                $push: { followers: req.body.id } 
            });

            await currentUser.updateOne({ 
                $push: { following: req.params.id } 
            });
        } else {
            res.status(403).json("You are already following this user");
        }
        res.status(200).json("Following the User");
    }catch(err) {
        next(err);
    }
}

const unFollowUser = async (req, res, next) => {
    try {
        //User you want to follow
        const user = await User.findById(req.params.id);
        //Current user
        const currentUser = await User.findById(req.body.id);

        if(currentUser.following.includes(req.params.id)) {
            await user.updateOne({ 
                $pull: { followers: req.body.id } 
            });

            await currentUser.updateOne({ 
                $pull: { following: req.params.id } 
            });
        } else {
            res.status(403).json("You are not following this user");
        }
        res.status(200).json("UnFollowing the User");
    }catch(err) {
        next(err);
    }
}

module.exports = { getUser , updateUser, deleteUser, followUser, unFollowUser };