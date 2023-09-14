const router = require('express').Router();
const { saveNewSubject, removeSubject, updateSubject, getAllSubjects } = require('../../controllers/dashboard/subjects.cont');
// const roleMiddleware = require('../../middleware/user.role')


router
    .get('/get-all-subjects', getAllSubjects)
    .post('/save-new-subject', saveNewSubject)
    .delete('/delete-subject', removeSubject)
    .patch('/update-subject', updateSubject)

module.exports = router;