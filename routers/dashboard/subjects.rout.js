const router = require('express').Router();
const { saveNewSubject, removeSubject, updateSubject } = require('../../controllers/dashboard/subjects.cont');


router
    .post('/save-new-subject', saveNewSubject)
    .delete('/delete-subject', removeSubject)
    .patch('/update-subject', updateSubject)

module.exports = router;