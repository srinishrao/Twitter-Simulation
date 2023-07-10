const jwt = require('jsonwebtoken');
const { handleError } = require('./error.js');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("token", token);
    if(!token) { return next(handleError(401, "You are not authenticated")); }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) { return next(handleError(403, "Token is invalid")); }
        req.user = user;
        next();
    });
}

module.exports = verifyToken ;