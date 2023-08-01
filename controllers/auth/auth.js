const { registValidation, loginValidation } = require("../../validation/authValidation")
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const { httpCodes } = require("../../utils/httpStatusCode");

exports.regUser = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body

        const { error } = registValidation.validate({ userName, email, password, confirmPassword })

        if (error) {
            console.error(`auth.js regUser validation error: ${error.message}`)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const saveUser = `INSERT INTO users (Email, UserName, UserPassword, UserRole ) VALUES ("${email}", "${userName}","${hashpass}","user")`

        db.query(saveUser, (err) => {
            if (err) {
                console.error(`auth.js regUser sql error: ${err.sqlMessage}`);
                return res.status(httpCodes.REQUEST_CONFLICT).send({ continueWork: false, message: err.sqlMessage })
            }

            res.status(httpCodes.OK).send({ continueWork: true, message: "User Saved" })
        })
    } catch (error) {
        console.error(error)
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const { error } = loginValidation.validate({ email, password })

        if (error) {
            console.error(`auth.js loginUser validation error: ${error.message}`)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const searchUser = `SELECT UserName, UserRole, UserPassword FROM users WHERE Email="${email}"`

        db.query(searchUser, async (err, user) => {
            if (err) {
                console.error(`auth.js loginUser sql error: ${err.sqlMessage}`);
                return res.status(httpCodes.REQUEST_CONFLICT).send({ continueWork: false, message: err.sqlMessage })
            }

            if (user.length == 0) {
                console.log('`auth.js loginUser User not exist')
                return res.status(httpCodes.NOT_FOUND).send({ continueWork: false, message: "User not exist" })
            }

            console.log(user)
            const comparePass = await bcrypt.compare(password, user[0].UserPassword)

            if (!comparePass) {
                console.log(`auth.js loginUser Password not correct`)
                return res.status(httpCodes.UNAUTHORIZED).send({ continueWork: false, message: "Password not correct" })
            }

            const cookiesData = { userID: user[0].UserID, userRole: user[0].UserRole }
            const token = jwt.encode(cookiesData, process.env.SECRET)

            res.cookie("weblearningtoken", token, { maxAge: 1000 * 60 * 60 * 3, httpOnly: true })
            res.status(httpCodes.OK).send({
                continueWork: true,
                isLogin: true,
                message: "User Login",
                userName: user[0].UserName,
                userRole: user[0].UserRole
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}