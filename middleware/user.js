const jwt = require('jwt-simple');
const { httpCodes } = require('../utils/httpStatusCode');

module.exports = async (req, res, next) => {
    const { weblearningtoken } = req.cookies

    if (!weblearningtoken) {
        return next()
    }

    const { userID } = await jwt.decode(weblearningtoken, process.env.SECRET)

    const userSearch = `SELECT Email, UserName, UserID FROM users WHERE userID=${userID}`

    db.query(userSearch, (err, result) => {
        if (err) {
            console.error(`user middleware sql error: ${err.sqlMessage}`);
            return res
                .status(httpCodes.REQUEST_CONFLICT)
                .send({ continueWork: false, message: err.sqlMessage });
        }

        // console.log(result)
        req.user = result[0]

        next()
    })
}