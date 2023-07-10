const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auths.js');
const tweetRoutes = require('./routes/tweets.js');

const app = express();
dotenv.config();

const connect = () => {
    //mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to MongoDB Database');
    }).catch((err) => {
        throw err;
    })
}

var cors = require('cors')
app.use(cors())

app.use(cookieParser())  //This will allow to read the access token in verifyToken file
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);

app.listen(8000, () => {
    connect()
    console.log('Server is running on port 8000');
});