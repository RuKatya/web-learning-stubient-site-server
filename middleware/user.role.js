const { httpCodes } = require('../utils/httpStatusCode');


module.exports = (req, res, next) => {
    try {
        if (!req.user) {
            return next()
        }
        const { UserRole } = req.user

        if (UserRole !== "admin") {
            return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "something don't work" });
        }

        next()
    } catch (error) {
        console.log(error)
    }
}