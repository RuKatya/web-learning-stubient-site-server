const { httpCodes } = require('../utils/httpStatusCode');


module.exports = (req, res, next) => {
    try {
        const { SubjectName } = req.body

        if (!SubjectName) return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: 'Something went wrong' });

        const selectSubject = `SELECT * FROM subjects WHERE SubjectName = '${SubjectName}'`

        db.query(selectSubject, (err, subject) => {
            if (err) {
                console.error('subject.getId.js sql error subjectIDmiddle', err.sqlMessage);
                return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "Something went wrong..." })
            }

            req.subject = subject[0]

            return next()
        })
    } catch (error) {
        console.log(`subject.getId.js error subjectIDmiddle`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, isLogin: false, message: "Server Feiled, try again" })
    }
}