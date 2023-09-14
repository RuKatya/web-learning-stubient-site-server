const { connectionToENV } = require('./utils/connectionToENV');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userMiddleware = require('./middleware/user.login')
const roleMiddleware = require('./middleware/user.role')
const app = express();

const PORT = process.env.PORT || 9595;
const HOST = process.env.HOST || 'localhost';
const CORS_OPTIONS = {
    origin: process.env.CORS_URL || 3000,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(userMiddleware)

app.set('view engine', 'ejs') //connecting ejs
console.log(app.get('view engine'))
// app.set('views', path.resolve(__dirname, 'ejs'))

connectionToENV();
global.db = require('./utils/connectionDB');

app.use('/auth', require('./routers/auth/auth.router'));
app.use('/user', require('./routers/user/user.router'));
app.use('/dashboard', roleMiddleware, require('./routers/dashboard'))

// Handle 500
app.use(function (error, req, res, next) {
    res.send('500: Internal Server Error', 500);
});

app.listen(PORT, () => {
    console.log(`http://${HOST}:${PORT}`);
});