// const connection = require('./utils/connectionDB');
// const { connection } = require('./utils/connectionDB');
const { connectionToENV } = require('./utils/connectionToENV');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

connectionToENV();
global.db = require('./utils/connectionDB');


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})