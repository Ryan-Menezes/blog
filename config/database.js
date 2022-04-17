require('dotenv').config()

module.exports = {
    server: process.env.DATABASE_SERVER,
    name: process.env.DATABASE_NAME
}