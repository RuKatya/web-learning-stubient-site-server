const router = require('express').Router();

router
    .use('/subjects', require('./subjects.rout'))
    .use('/titles', require('./titles.rout'))
    .use('/questions', require('./question.rout'))

module.exports = router;