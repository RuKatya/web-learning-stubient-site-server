const jwt = require('jwt-simple');
const { httpCodes } = require('../utils/httpStatusCode');

module.exports = async (req, res, next) => {
    try {
        const { weblearningtoken } = req.cookies

        if (!weblearningtoken) {
            return next()
        }

        const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)
        const userSearch = `SELECT Email, UserName, UserID, UserRole FROM users WHERE userID=${userID}`

        db.query(userSearch, (err, result) => {
            if (err) {
                console.error(`user middleware sql error: ${err.sqlMessage}`);
                return res.status(httpCodes.REQUEST_CONFLICT).send({ continueWork: false, message: err.sqlMessage });
            }

            req.user = result[0]

            return next()
        })
    } catch (error) {
        console.log(`user.login.js error userLoginMiddlware`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, isLogin: false, message: "Server Feiled, try again" })
    }
}