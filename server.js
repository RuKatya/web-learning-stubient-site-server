const { connectionToENV } = require('./utils/connectionToENV');
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
var cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000' }))

connectionToENV();
global.db = require('./utils/connectionDB');

app.use('/auth', require('./routers/auth/auth'))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})