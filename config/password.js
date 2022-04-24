require('dotenv').config()

module.exports = {
    salt: Number(process.env.PASSWORD_SALT)
}