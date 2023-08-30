const {
    regUser,
    loginUser,
    userLogout
} = require('../../controllers/auth/auth.controller');
const userRole = require('../../middleware/user.role');

const router = require('express').Router();

router
    .post("/login-user", loginUser)
    .post("/save-user", regUser)
    .get("/user-logout", userLogout)

module.exports = router;