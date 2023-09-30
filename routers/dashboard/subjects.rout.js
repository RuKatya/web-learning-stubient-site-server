const router = require('express').Router();
const { saveNewSubject, removeSubject, updateSubject, getAllSubjects } = require('../../controllers/dashboard/subjects.cont');

router
    .get('/get-all-subjects', getAllSubjects)               // Get All Subjects 
    .post('/save-new-subject', saveNewSubject)              // Save New Subject
    .delete('/delete-subject', removeSubject)               // Remove Subject
    .patch('/update-subject', updateSubject)                // Update Name of Subject

module.exports = router;