const router = require('express').Router();

router
    .use('/subjects', require('./subjects.rout'))
    .use('/titles', require('./titles.rout'))

module.exports = router;