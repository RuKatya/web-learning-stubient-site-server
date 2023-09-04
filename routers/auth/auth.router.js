const {
    regUser,
    loginUser,
    userLogout,
    checkUserCookies
} = require('../../controllers/auth/auth.controller');

const router = require('express').Router();

router
    .post("/login-user", loginUser)
    .post("/save-user", regUser)
    .get("/user-logout", userLogout)
    .get('/user-checking', checkUserCookies)

module.exports = router;