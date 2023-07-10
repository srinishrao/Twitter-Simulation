const express = require('express');
const { getUser, updateUser, deleteUser, 
    followUser, unFollowUser } =  require('../controllers/user.js');
const verifyToken  = require('../verifyToken.js');

const router = express.Router();

router.get('/find/:id', getUser);

router.put('/:id', /*verifyToken,*/ updateUser)

router.delete('/:id', /*verifyToken,*/ deleteUser);

router.put('/follow/:id', /*verifyToken,*/ followUser);

router.put('/unfollow/:id', /*verifyToken,*/ unFollowUser);

module.exports = router;