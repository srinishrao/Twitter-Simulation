const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, required: true, min: 3, max: 30
        },
        lastName: {
            type: String, required: true, min: 3, max: 30
        },
        email: {
            type: String, required: true, unique: true, max: 50
        },
        password: {
            type: String, required: true, min: 5
        },
        profilePicture: {
            type: String, default: ""
        },
        location: {
            type: String, default: ""
        },
        followers: {
            type: Array, defaultValue: []
        },
        following: {
            type: Array, defaultValue: []
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema);

