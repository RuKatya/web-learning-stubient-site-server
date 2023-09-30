const { httpCodes } = require("../../utils/httpStatusCode");
const { questionsValidation, updateQuestionValidation } = require("../../validation/dashboard.validation");


// ---- Get All Questions By Title ID ---- //
exports.getAllQuestionsByTitleID = async (req, res) => {
    try {
        const { Title_QuizID } = req.body

        const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${Title_QuizID}`

        db.query(getQuestions, (err, questions) => {
            if (err) {
                console.error('question.cont.js sql error getAllQuestionsByTitleID', err.sqlMessage);
                return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.status(httpCodes.OK).send({ continueWork: true, questions })
        })
    } catch (error) {
        console.log(`question.cont.js getAllQuestionsByTitleID server error`)
        console.log(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}


// ---- Saves Question ---- //
exports.saveNewQuestions = (req, res) => {
    try {
        const { questions, draft } = req.body
        console.log(questions)
        console.log(draft)
        const TitleID = questions[0].Title_QuizID               /*  The questions is array that include many object. 
                                                                    Each object include Title_QuizID key.
                                                                    To save the questions to the right title we use Title_QuizId of fist object in the array */


        const { error } = questionsValidation.validate(questions)

        if (error) {
            console.error('question.cont.js validation error saveNewQuestions:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const questionsToServer = questions.map(obj => Object.values(obj))

        const query = `INSERT INTO title_qustions (QuestionText, Answer1, Answer2, Answer3, Answer4, Title_QuizID, RigthQuestion, SubjectID) VALUES ?`

        db.query(query, [questionsToServer], (err, result) => {
            if (err) {
                console.error('question.cont.js sql error saveNewQuestions question', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            const saveTitleDraft = `UPDATE titles_quizes SET Draft = ${draft} WHERE Title_QuizID = ${TitleID}`

            db.query(saveTitleDraft, err => {
                if (err) {
                    console.error('question.cont.js sql error saveNewQuestions draft', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
                }
            })

            const getQuestions = `SELECT * FROM title_qustions WHERE Title_QuizID = ${TitleID}`

            db.query(getQuestions, (err, questions) => {
                if (err) {
                    console.error('question.cont.js sql error saveNewQuestions title', err.sqlMessage);
                    return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
                }

                return res.status(httpCodes.OK).send({ continueWork: true, message: "Saved", questions })
            })
        })
    } catch (error) {
        console.log(`question.cont.js saveNewQuestions server error`)
        console.log(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}


// ---- Update Question ---- //
exports.updateQuestion = async (req, res) => {
    try {
        const { QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion } = req.body

        const { error } = updateQuestionValidation.validate({ QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion })

        if (error) {
            console.error('question.cont.js validation error updateQuestion:', error.message)
            return res.status(httpCodes.FORBIDDEN).send({ continueWork: false, message: error.message })
        }

        const updateQuestion = `UPDATE title_qustions SET QuestionText = '${QuestionText}', Answer1 = '${Answer1}', Answer2 = '${Answer2}', Answer3 = '${Answer3}', Answer4 = '${Answer4}', RigthQuestion = '${RigthQuestion}' WHERE QuestionID = ${QuestionID};`

        db.query(updateQuestion, (err, result) => {
            if (err) {
                console.error('question.cont.js sql error updateQuestion', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            res.send({ continueWork: true, message: "Question Updated", QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion })
        })
    } catch (error) {
        console.log(`question.cont.js updateQuestion server error`)
        console.log(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Delete Question ---- //
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.body

        const deleteQuestionQuery = `DELETE FROM title_qustions WHERE QuestionID = ${id}`

        db.query(deleteQuestionQuery, (err, result) => {
            if (err) {
                console.error('question.cont.js sql error deleteQuestion', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.send({ continueWork: true, id, message: "Question Deleted" }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log(`question.cont.js deleteQuestion server error`)
        console.log(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}

// ---- Delete Many Question ---- //
exports.deleteManyQuestions = async (req, res) => {
    try {
        const { ids } = req.body

        const deleteMany = `DELETE FROM title_qustions WHERE QuestionID IN (${ids})`

        db.query(deleteMany, (err, result) => {
            if (err) {
                console.error('question.cont.js sql error deleteManyQuestions', err.sqlMessage);
                return res.status(httpCodes.BAD_REQUEST).send({ continueWork: false, message: "Something went wrong..." })
            }

            return res.send({ continueWork: true, ids, message: "Questions Deleted" }).status(httpCodes.OK)
        })
    } catch (error) {
        console.log(`question.cont.js deleteManyQuestions server error`)
        console.log(error);
        return res.status(httpCodes.SERVER_ERROR).send({ message: "Server Feiled, try again" })
    }
}