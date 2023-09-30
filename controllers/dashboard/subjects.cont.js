const { httpCodes } = require("../../utils/httpStatusCode");
const { subjectNameValidation } = require("../../validation/dashboard.validation");

// ---- Get All Subjects For Admin---- //
exports.getAllSubjects = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects;`

        db.query(query, (err, subjects) => {
            if (err) {
                console.error('subject.cont.js sql error getAllSubjects', err.sqlMessage);
                return res.status(httpCodes.SERVER_ERROR).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, subjects })
        })
    } catch (error) {
        console.log(`subject.cont.js getAllSubjects server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: 'Server Feiled, try again' })
    }
}

// ---- Save New Subject ---- //
exports.saveNewSubject = (req, res) => {
    try {
        const { newName } = req.body

        const { error } = subjectNameValidation.validate({ newName })

        if (error) {
            console.error('SubjectsCont.js line:13 validation error of saveNewSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const query = `INSERT INTO subjects (subjectName) VALUES ("${newName}")`

        db.query(query, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:21 sql error saveNewSubject', err.sqlMessage);
                return res.status(httpCodes.REQUEST_CONFLICT).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res
                .status(httpCodes.OK)
                .send({
                    continueWork: true,
                    message: "Subject Saved",
                    SubjectID: result.insertId,
                    newName
                })
        })
    } catch (error) {
        console.log(`subject.cont.js saveNewSubject server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Remove Subject ---- // -- NEED TO CHECK HOW WE CAN DO IT BETTER
exports.removeSubject = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuery = `DELETE FROM subjects WHERE SubjectID=${id} `

        db.query(deleteQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:107 sql error removeSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            // res.send("deleted")
            const deleteAllTitles = `DELETE FROM titles_quizes WHERE SubjectID=${id}`
            // const deleteAllTitlesqweqwe = `DELETE FROM titles_quizes WHERE SubjectID=${id} UNION DELETE FROM title_qustions WHERE SubjectID=${id} UNION `

            db.query(deleteAllTitles, (err, deletedQuestions) => {
                if (err) {
                    console.error('TitleConst.js line:115 sql error removeSubject', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
                }

                const deleteAllQuestions = `DELETE FROM title_qustions WHERE SubjectID=${id}`

                db.query(deleteAllQuestions, (err, deletedQuestions) => {
                    if (err) {
                        console.error('TitleConst.js line:123 sql error removeSubject', err.sqlMessage);
                        return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
                    }

                    return res
                        .status(httpCodes.OK)
                        .send({ continueWork: true, id, message: "Subject Deleted" })
                })
            })
        })
    } catch (error) {
        console.log(`subject.cont.js removeSubject server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Update Subject ---- //
exports.updateSubject = async (req, res) => {
    try {
        const { id, newName } = req.body

        const { error } = subjectNameValidation.validate({ newName })

        if (error) {
            console.error('SubjectsCont.js line:109 validation error of updateSubject:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuery = `UPDATE subjects SET subjectName='${newName}' WHERE SubjectID=${id}`

        db.query(updateQuery, (err, result) => {
            if (err) {
                console.error('SubjectsCont.js line:77 sql error updateSubject', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res
                .status(httpCodes.OK)
                .send({ continueWork: true, id, SubjectName, message: "Subject Updated" })
        })
    } catch (error) {
        console.log(`subject.cont.js updateSubject server error`)
        console.error(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}