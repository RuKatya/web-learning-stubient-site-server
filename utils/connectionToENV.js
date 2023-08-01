const path = require('path')

exports.connectionToENV = () => {
    if (process.env.NODE_ENV == "production") {
        require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });
    } else {
        require('dotenv').config()
    }
}