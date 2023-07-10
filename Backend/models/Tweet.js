const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String,
            default: ''
        },
        likes: {
            type: Array,
            defaultValue: []
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Tweet', TweetSchema);