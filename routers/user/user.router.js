const { userLogout } = require('../../controllers/user/user.controller');

const router = require('express').Router();

router
    .get('/user-logout', userLogout)


module.exports = router;