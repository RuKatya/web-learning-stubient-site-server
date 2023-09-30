const { httpCodes } = require("../../utils/httpStatusCode");
const { newNameValidation } = require("../../validation/dashboard.validation");

// ---- Get All Titles By Subject Id ---- //
exports.getAllTitles = async (req, res) => {
    try {
        const { SubjectID } = req.body

        const query = `SELECT * FROM titles_quizes WHERE SubjectID = ${SubjectID}`

        db.query(query, (err, titles) => {
            if (err) {
                console.error('title.cont.js sql error getAllTitles', err.sqlMessage);
                return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, titles })
        })
    } catch (error) {
        console.log(`title.cont.js getAllTitles server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}


// ---- Save New Title ---- //
exports.saveNewTitle = (req, res) => {
    try {
        const { newName, SubjectID } = req.body

        const { error } = newNameValidation.validate({ newName })

        if (error) {
            console.error('title.cont.js validation error of saveNewTitle:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO titles_quizes (Title, SubjectID, Draft) VALUES ("${newName}", "${SubjectID}", true)`

        db.query(query, (err, result) => {
            if (err) {
                console.error('title.cont.js sql error saveNewTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: err.sqlMessage })
            }

            return res.status(httpCodes.OK).send({
                continueWork: true,
                message: "Subject Saved",
                SubjectID: Number(SubjectID),
                Title: newName,
                Title_QuizID: result.insertId,
                Draft: 1
            })
        })
    } catch (error) {
        console.log(`title.cont.js saveNewTitle server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Title ---- //
exports.updateTitle = async (req, res) => {
    try {
        const { id, newName } = req.body

        const { error } = newNameValidation.validate({ newName })

        if (error) {
            console.error('TitleConst.js line:76 validation error of updateTitle', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE titles_quizes SET Title='${newName}' WHERE Title_QuizID=${id}`

        db.query(updateQuery, (err, result) => {
            if (err) {
                console.error('TitleConst.js line:84 sql error updateTitle', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, id, TitleName: newName, message: "Title Updated" })
        })
    } catch (error) {
        console.log(`title.cont.js updateTitle server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Remove Title ---- //
exports.removeTitle = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuery = `DELETE FROM titles_quizes WHERE Title_QuizID=${id}`

        db.query(deleteQuery, (err, deletedTitles) => {
            if (err) {
                console.error('title.cont.js sql error removeTitle title', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            const deleteAllQuestions = `DELETE FROM title_qustions WHERE Title_QuizID=${id}`

            db.query(deleteAllQuestions, (err, deletedQuestions) => {
                if (err) {
                    console.error('title.cont.js line:120 sql error removeTitle questions', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
                }

                return res.status(httpCodes.OK).send({ continueWork: true, id, message: "Title Deleted" })
            })
        })
    } catch (error) {
        console.log(`title.cont.js removeTitle server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}