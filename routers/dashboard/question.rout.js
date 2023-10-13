const router = require('express').Router();
const { getAllQuestionsByTitleID, saveNewQuestions, updateQuestion, deleteQuestion, deleteManyQuestions } = require('../../controllers/dashboard/question.cont');

router
    .get('/get-all-questions', getAllQuestionsByTitleID)        // Get All Questions of Title 
    .post('/save-new-questions', saveNewQuestions)              // Save New Questions of Title
    .patch('/update-question', updateQuestion)                  // Update Question
    .delete('/delete-question', deleteQuestion)                 // Remove Question
    // .delete('/delete-question', deleteQuestion)                 // Remove Question
    .delete('/delete-many-question', deleteManyQuestions)       // Remove many questions

module.exports = router;