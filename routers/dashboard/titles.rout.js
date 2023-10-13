const router = require('express').Router();
const { getAllTitles, updateTitle, saveNewTitle, removeTitle } = require('../../controllers/dashboard/title.cont');
const subjectIDmiddle = require('../../middleware/subject.getid')

router
    .post('/get-all-titles', subjectIDmiddle, getAllTitles)              // Get All Titles Of Subject
    .post('/save-new-title', saveNewTitle)              // Save New Title of Subject
    .patch('/update-title', updateTitle)                // Update Title of Subject
    .delete('/remove-title', removeTitle)               // Delete Title of Subject and Questions of the Title


module.exports = router;