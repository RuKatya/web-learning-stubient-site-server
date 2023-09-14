const router = require('express').Router();
// const { saveNewSubject, removeSubject, updateSubject, getAllSubjects } = require('../../controllers/dashboard/subjects.cont');
// const roleMiddleware = require('../../middleware/user.role')
// const roleMiddleware = require('../../middleware/user.role')

router
    .use('/subjects', require('./subjects.rout'))
// .get('/get-all-subjects', roleMiddleware, getAllSubjects)
// .post('/save-new-subject', saveNewSubject)
// .delete('/delete-subject', removeSubject)
// .patch('/update-subject', updateSubject)

module.exports = router;