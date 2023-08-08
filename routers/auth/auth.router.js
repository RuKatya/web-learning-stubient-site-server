const {
    regUser,
    loginUser
} = require('../../controllers/auth/auth.controller');

const router = require('express').Router();

router
    .post("/login-user", loginUser)
    .post("/save-user", regUser)

module.exports = router;