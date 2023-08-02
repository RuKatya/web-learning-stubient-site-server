const { connectionToENV } = require('./utils/connectionToENV');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;
// <<<<<<< cors-branch
const HOST = process.env.HOST || 'localhost';
const CORS_OPTIONS = {
    origin: process.env.CORS_URL || 3000,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
// =======
// var cors = require('cors')

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({ origin: 'http://localhost:3000' }))
// >>>>>>> main

connectionToENV();
global.db = require('./utils/connectionDB');

app.use('/auth', require('./routers/auth/auth'));

app.listen(PORT, () => {
    console.log(`http://${HOST}:${PORT}`);
});
